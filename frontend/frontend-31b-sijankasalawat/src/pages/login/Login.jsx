import React, { useState } from "react";
import "./Login.css";
import Sliders from "../component/Slider";
import Sec from "../../assets/images/Sec.png";
import { loginApi } from "../../Apis/Api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ForgetPassword from "../component/ForgetPassword";

const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errors, setErrors] = useState({}); // State to track validation errors

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const validate = () => {
    let tempErrors = {};
    if (!email) tempErrors.email = "Email is required";
    if (!password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return; // Stop if validation fails

    const data = {
      email: email,
      password: password
    };

    loginApi(data)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          const convertedJson = JSON.stringify(res.data.userData);
          localStorage.setItem("user", convertedJson);
          navigate("/dashboard");
        } else {
          // Display the error message from the response
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          // Display the error message from the backend
          toast.error(err.response.data.message);
        } else {
          // General error message
          toast.error("Internal server error");
        }
      });
  }

  return (
    <>
      <div className="bg-gray-100">
        <div className="login-page container mx-auto h-100">
          <div className="w-full grid grid-cols-1 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1">
            <div className="left-container col-span-2 xl:block md:block sm:hidden hidden">
              <img src={Sec} alt="background image " className="p-2 rounded-md pt-3" />
            </div>
            <div className="right-container p-3">
              <div className="change-image">
                <Sliders />
              </div>
              <h1 className="text-grey-500 lg:text-[24px] sm:text[18px] mb-4 font-large pt-2">Login</h1>

              <div className="relative mb-3">
                <input
                  onChange={handleEmail}
                  value={email}
                  placeholder="Enter your email"
                  type="text"
                  className={`block w-full rounded-md border-0 py-1.5 pl-10 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${errors.email ? "ring-red-500" : "focus:ring-sky-600"} sm:text-sm sm:leading-6`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                  </svg>
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="relative mb-3">
                <input
                  onChange={handlePassword}
                  value={password}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  className={`block w-full rounded-md border-0 py-1.5 pl-10 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${errors.password ? "ring-red-500" : "focus:ring-sky-600"} sm:text-sm sm:leading-6`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
                    <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z" clipRule="evenodd" />
                  </svg>
                </div>
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                  </svg>
                   
                  ) : (
                    
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                     <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                     <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                     <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                   </svg>
                  )}
                </button>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <button onClick={handelSubmit} className="bg-sky-400 w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-2 hover:bg-sky-600 text-white">Login</button>

              <ForgetPassword />
              <h2 className="pt-4">Don’t have an account? <Link to="/register" className="text-sky-500 hover:text-sky-400">Sign Up</Link></h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
