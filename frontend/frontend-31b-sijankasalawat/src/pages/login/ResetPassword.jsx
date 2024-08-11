import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPasswordApi } from "../../Apis/Api";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleResetPassword = () => {
    const data = {
      password: newPassword,
    };
  
    resetPasswordApi(data, token)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/");
        } else {
          toast.error("Failed to update password");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal server error");
      });
  };
  
  return (
<div className="flex justify-center w-full">
          <div class="max-w-sm rounded overflow-hidden shadow-lg w-full p-2">
          <h3 className=" text-center mb-4 text-gray-600 font-bold text-lg">Password Reset</h3>
           

  <form>
                <div className="form-group">
                  <label className="text-gray-600">New Password</label>
              
                     <input  onChange={handleNewPassword}
              placeholder="Enter your new password"
              type="text"
              className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
                </div>
                <div className="text-center">
                <button    onClick={handleResetPassword} className="bg-sky-400 w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-2  hover:bg-sky-600 text-white "> Reset Password</button>
                
                </div>
              </form>
</div>
</div>


  );
};

export default ResetPassword;
