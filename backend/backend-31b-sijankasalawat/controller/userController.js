const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const User = require("../model/userModel");
const { sendEmail } = require("../middleware/sendEmail");
const cloudinary = require('cloudinary').v2;

const createUser = async (req, res) => {
  const { fName, lName, email, phoneNumber, password } = req.body;

  if (!fName || !lName || !email || !phoneNumber || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const randomSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, randomSalt);

    const newUser = new User({
      fName,
      lName,
      email,
      phoneNumber,
      password: encryptedPassword,
    });

    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    if (user.isLocked) {
      const lockTimeLeft = Math.round((user.lockUntil - Date.now()) / 1000 / 60);
      return res.status(423).json({
        success: false,
        message: `Account is temporarily locked. Try again in ${lockTimeLeft} minutes.`,
      });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      await user.incrementLoginAttempts();
      const attemptsLeft = 3 - user.loginAttempts;
      const message = user.loginAttempts >= 3
        ? "Too many failed login attempts. Try again in 1 minute."
        : `Invalid credentials. ${attemptsLeft} attempt(s) left.`;
      return res.status(400).json({
        success: false,
        message,
      });
    }

    // Reset login attempts after a successful login
    if (!user.isLocked) {
      user.loginAttempts = 0;
      user.lockUntil = undefined;
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      userId: user._id,
      token,
      userData: user,
    });
  } catch (error) {
    console.error("Backend Error:", error); // Log the actual backend error
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message // Include the actual error message in the response
    });
  }
};



const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email not found",
      });
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const frontendBaseUrl = process.env.FRONTEND_BASE_URL || "http://localhost:3000";
    const resetUrl = `${frontendBaseUrl}/password/reset/${resetToken}`;

    const message = `Reset your password by clicking on the link below:\n\n${resetUrl}`;

    try { 
      // Send reset email
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      // Clear reset token if email could not be sent
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      console.error("Error sending email:", error); // Log the error for debugging

      res.status(500).json({
        success: false,
        message: "Email could not be sent. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error in forgotPassword:", error); // Log the error for debugging

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    const randomSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, randomSalt);

    user.password = encryptedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const userId = req.params.id || req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id || req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let avatarUrl = null;
    if (req.files && req.files.avatar) {
      const { avatar } = req.files;
      const uploadedAvatar = await cloudinary.uploader.upload(avatar.path, { folder: 'avatars' });

      if (!uploadedAvatar || !uploadedAvatar.secure_url) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload avatar to Cloudinary",
        });
      }

      avatarUrl = uploadedAvatar.secure_url;
    } else {
      avatarUrl = req.body.avatar;
    }

    const updateData = {
      ...req.body,
      avatar: avatarUrl,
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUsers,
  updateUserProfile,
};
