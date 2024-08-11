import React, { useEffect, useRef, useState } from "react";
import bg from "../../assets/images/bggg.png";

import {
  getLoggedInUserDetail,
  updateLoggedInUserDetail,
} from "../../Apis/Api";

import { toast } from "react-toastify";
const Profile = ({ }) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUser((user) => ({ ...user, avatar: file }));
  };

  const initialUserState = {
    fName: "",
    lName: "",
    email: "",
    phoneNumber: "",
    address: "",
    avatar: "",
  };

  const [user, setUser] = useState(initialUserState);
  useEffect(() => {
    getLoggedInUserDetail()
      .then((res) => {
        console.log("res: ", res);
        if (res.data.success === false) {
          toast.error(res.data.message);
          return;
        } else if (res.data.success === true) {
          setUser(res.data.user);
          
        } else {
          toast.error("Internal server error");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal server error");
      });
  }, []);

  const handleUserUpdate = async () => {
    try {
      const fd = new FormData();
      fd.append("fName", user.fName);
      fd.append("lName", user.lName);
      fd.append("email", user.email);
      fd.append("phoneNumber", user.phoneNumber);
      fd.append("address", user.address);
      fd.append("avatar", user.avatar);

      const res = await updateLoggedInUserDetail(fd);
       toast.success(res.data.message);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const placeholderAvatar =
    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

  return (
    <>
      <div className=" h-[95vh]" style={{backgroundImage: `url(${bg}) `, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
        <div className="p-4" />
        <div className="container  bg-white p-3 rounded-lg lg:w-1/2 md:w-3/4 sm:w-3/4 drop-shadow-xl ">
          <div className="">
            <h3 className=" text-xl text-gray-700 font-bold text-center w-full">
              {" "}
              Your Profile
            </h3>
            <hr className="w-full py-3" />
          </div>
          <div className="w-full ">
            <div className="profile-image w-30 flex justify-center" onClick={handleImageClick}>
              <img
                src={user.avatar || placeholderAvatar}
                className="w-[200px] h-[200px] object-contain rounded-full"
                alt="User Profile"
                onError={(e) => console.error("Image loading error", e)}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e)}
              />
            </div>
            <div className="w-70">
              <div className="grid grid-cols-1 lg-grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2">
                <div className="div">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    First Name
                  </label>
                  <input
                  onChange={(event)=>setUser((user)=>({...user,fName:event.target.value}))}
                    value={user.fName}
                    placeholder="your First name"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="div">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Last Name
                  </label>

                  <input
                  onChange={(event)=>setUser((user)=>({...user,lName:event.target.value}))}

                    value={user.lName}
                    placeholder="your last name"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="div">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>

                  <input
                  onChange={(event)=>setUser((user)=>({...user,email:event.target.value}))}

                    value={user.email}
                    placeholder="your email"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="div">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Address
                  </label>

                  <input
                  onChange={(event)=>setUser((user)=>({...user,address:event.target.value}))}
                    value={user.address || ''}
                    placeholder="Address"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="div">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Phone Number
                  </label>

                  <input
                  onChange={(event)=>setUser((user)=>({...user,phoneNumber:event.target.value}))}

                    value={user.phoneNumber}
                    placeholder="phone number"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <button onClick={handleUserUpdate} className="bg-sky-400 w-fit px-3 rounded-md border-0 py-1.5 pl-5 pr-5 mb-2  hover:bg-sky-600 text-white ">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
