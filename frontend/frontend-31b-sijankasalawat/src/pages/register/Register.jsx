import React, { useState } from "react";
import Sliders from "../component/Slider";
import Sec from "../../assets/images/Sec (1).png";
import { registerAPI } from "../../Apis/Api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Register = () => {
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  const changeFirstName = (e) => {
    setFname(e.target.value);
    if (errors.fName) {
      setErrors((prevErrors) => ({ ...prevErrors, fName: "" }));
    }
  };

  const changeLastName = (e) => {
    setLname(e.target.value);
    if (errors.lName) {
      setErrors((prevErrors) => ({ ...prevErrors, lName: "" }));
    }
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const changePhoneNumber = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    setPhoneNumber(value);
    if (errors.phoneNumber) {
      setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" }));
    }
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  const validate = () => {
    const errors = {};
  
    if (!fName) errors.fName = "Please enter your first name";
    if (!lName) errors.lName = "Please enter your last name";
    if (!email) {
      errors.email = "Please enter your email";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Email must be a valid email address";
    }
    if (!phoneNumber) {
      errors.phoneNumber = "Please enter your phone number";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = "Phone number must be 10 digits";
    }
    if (!password) {
      errors.password = "Please enter your password";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.password = "Password must contain at least one special character";
    } else if (!/\d/.test(password)) {
      errors.password = "Password must contain at least one number";
    }
  
    return errors;
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const data = {
      fName: fName,
      lName: lName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    };

    registerAPI(data)
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Server Error");
      });
  };

  return (
    <div className="bg-gray-100">
      <div className="login-page container mx-auto h-100">
        <div className="w-full grid grid-cols-1 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1">
          <div className="left-container col-span-2 xl:block md:block sm:hidden hidden">
            <img
              src={Sec}
              alt="background image"
              className="p-2 rounded-md pt-3"
            />
          </div>
          <div className="right-container p-3">
            <div className="change-image">
              <Sliders />
            </div>
            <h1 className="text-grey-500 lg:text-[24px] sm:text[18px] mb-4 font-large pt-2">
              Register
            </h1>

            <div className="relative mb-3">
              <input
                onChange={changeFirstName}
                placeholder="Enter your first name"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
              </div>
              {errors.fName && <p className="text-red-500 text-xs mt-1">{errors.fName}</p>}
            </div>

            <div className="relative mb-3">
              <input
                onChange={changeLastName}
                placeholder="Enter your last name"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
              </div>
              {errors.lName && <p className="text-red-500 text-xs mt-1">{errors.lName}</p>}
            </div>

            <div className="relative mb-3">
              <input
                onChange={changeEmail}
                placeholder="Enter your email"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="relative mb-3">
              <input
                onChange={changePhoneNumber}
                placeholder="Enter your phone number"
                type="text"
                value={phoneNumber}
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                </svg>
              </div>
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>

            <div className="relative mb-3">
              <input
                onChange={changePassword}
                placeholder="Enter your password"
                type="password"
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
                  <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z" clipRule="evenodd" />
                </svg>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              onClick={handleSubmit}
              className="bg-gray-900 w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-2 hover:bg-gray-700 text-white"
            >
              Register
            </button>

            <h2 className="pt-4">
              Already have an account?{" "}
              <Link to="/" className="text-sky-500 hover:text-sky-400">
                Sign in
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
