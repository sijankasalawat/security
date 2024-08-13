import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPasswordApi } from "../../Apis/Api";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleResetPassword = () => {
    if (!validatePassword(newPassword)) {
      toast.error("Password must be at least 8 characters long and include a number and a special character.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const data = {
      password: newPassword,
    };

    resetPasswordApi(data, token)
      .then((res) => {
        if (res.data.success) {
          toast.success("Password updated successfully.");
          navigate("/");
        } else {
          toast.error("Failed to update password.");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal server error.");
      });
  };

  return (
    <div className="flex justify-center w-full">
      <div className="max-w-sm rounded overflow-hidden shadow-lg w-full p-2">
        <h3 className="text-center mb-4 text-gray-600 font-bold text-lg">Password Reset</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label className="text-gray-600">New Password</label>
            <input
              onChange={handleNewPassword}
              value={newPassword}
              placeholder="Enter your new password"
              type="password"
              className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
          <div className="form-group">
            <label className="text-gray-600">Confirm New Password</label>
            <input
              onChange={handleConfirmPassword}
              value={confirmPassword}
              placeholder="Re-enter your new password"
              type="password"
              className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
          <div className="text-center">
            <button
              onClick={handleResetPassword}
              className="bg-sky-400 w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-2 hover:bg-sky-600 text-white"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default ResetPassword;
