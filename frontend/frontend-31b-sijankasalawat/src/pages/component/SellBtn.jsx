// import { Fragment, useRef, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import React, { useEffect } from "react";
// import plus from "../../assets/icons/basil_add-solid.png";

// import { createProductApi } from "../../Apis/Api.js";
// import { toast } from "react-toastify";

// const SellBtn = () => {
//   const [brandName, setBrandName] = useState("");
//   const [price, setPrice] = useState("");
//   const [details, setDetails] = useState("");
//   const [category, setCategory] = useState("");
//   const [address, setAddress] = useState("");
//   const [contactNo, setContactNo] = useState("");
//   const [time, setTime] = useState(null);
//   const [productImage, setProductImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);

//   const handleImage = (event) => {
//     const file = event.target.files[0];
//     console.log(file);
//     setProductImage(file);
//     setPreviewImage(URL.createObjectURL(file));
//   };
//   const handelSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("BrandName", brandName);
//     formData.append("price", price);
//     formData.append("details", details);
//     formData.append("productCategory", category);
//     formData.append("contactNo", contactNo);
//     formData.append("address", address);
//     formData.append("time", time);
//     formData.append("productImageUrl", productImage);
//     // send request to backend API
//     createProductApi(formData)
//       .then((res) => {
//         if (res.data.success == false) {
//           toast.error(res.data.message);
//         } else {
//           toast.success(res.data.message);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error("Internal server error");
//       });
//   };

//   const [open, setOpen] = useState(false);

//   const cancelButtonRef = useRef(null);

//   const handleSellBtnClick = () => {
//     console.log("Sell button clicked!");
//     setOpen(true);
//   };

//   return (
//     <div className="relative">
//       {/* The "Sell" button */}
//       <button
//         className="flex items-center justify-center border-none rounded-md bg-gray-900 mt-2 p-1 px-2 text-teal-50 hover:bg-gray-700 "
//         onClick={handleSellBtnClick}
//       >
//         <img src={plus} className="h-[25px]" alt="plus-icon" />
//         Sell
//       </button>

//       {/* The dialog */}
//       <Transition.Root show={open} as={Fragment}>
//         <Dialog
//           as="div"
//           className="relative z-10"
//           initialFocus={cancelButtonRef}
//           onClose={() => setOpen(false)}
//         >
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//           </Transition.Child>

//           <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//             <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                 enterTo="opacity-100 translate-y-0 sm:scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                 leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               >
//                 <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
//                   <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
//                     <div className="sm:flex sm:items-start  flex justify-center">
//                       <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
//                         <Dialog.Title
//                           as="h3"
//                           className="text-base font-semibold leading-6 text-gray-900"
//                         >
//                           Add Your Product
//                         </Dialog.Title>
//                         <div className="mt-2">
//                           <form className="p-4 ">
//                             <div className="grid gap-2 mb-4 grid-cols-2">
//                               <div className="col-span-2">
//                                 <label
//                                   for="name"
//                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                                 >
//                                   Product Name
//                                 </label>
//                                 <input
//                                   onChange={(e) => {
//                                     setBrandName(e.target.value);
//                                   }}
//                                   type="text"
//                                   name="name"
//                                   id="name"
//                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                                   placeholder="Type product name"
//                                   required=""
//                                 />
//                               </div>

//                               <div className="col-span-2">
//                                 <label
//                                   for="name"
//                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                                 >
//                                   Contact No
//                                 </label>
//                                 <input
//                                   onChange={(e) => {
//                                     setContactNo(e.target.value);
//                                   }}
//                                   type="text"
//                                   name="name"
//                                   id="name"
//                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                                   placeholder="Type product name"
//                                   required=""
//                                 />
//                               </div>
//                               <div className="col-span-2">
//                                 <div class="relative max-w-sm">
//                                   <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
//                                     <svg
//                                       class="w-4 h-4 text-gray-500 dark:text-gray-400"
//                                       aria-hidden="true"
//                                       xmlns="http://www.w3.org/2000/svg"
//                                       fill="currentColor"
//                                       viewBox="0 0 20 20"
//                                     >
//                                       <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
//                                     </svg>
//                                   </div>
//                                   <input
//                                     onChange={(e) => {
//                                       setTime(e.target.value);
//                                     }}
//                                     datepicker
//                                     type="text"
//                                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                     placeholder="Select date"
//                                   />
//                                 </div>
//                               </div>
//                               <div className="col-span-2 sm:col-span-1">
//                                 <label
//                                   for="price"
//                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                                 >
//                                   Price
//                                 </label>
//                                 <input
//                                   onChange={(e) => {
//                                     setPrice(e.target.value);
//                                   }}
//                                   type="number"
//                                   name="price"
//                                   id="price"
//                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                                   placeholder="Rs 2999"
//                                   required=""
//                                 />
//                               </div>
//                               <div className="col-span-2 sm:col-span-1">
//                                 <label
//                                   for="category"
//                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                                 >
//                                   Category
//                                 </label>
//                                 <select
//                                   onChange={(e) => {
//                                     setCategory(e.target.value);
//                                   }}
//                                   id="category"
//                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                                 >
//                                   <option selected="">Select category</option>
//                                   <option value="Automobile">Automobile</option>
//                                   <option value="Electronic">Electronic</option>
//                                 </select>
//                               </div>
//                               <div className="col-span-2">
//                                 <label
//                                   for="description"
//                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                                 >
//                                   Product Description
//                                 </label>
//                                 <textarea
//                                   onChange={(e) => {
//                                     setDetails(e.target.value);
//                                   }}
//                                   id="description"
//                                   rows="4"
//                                   className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                   placeholder="Write product description here"
//                                 ></textarea>
//                               </div>
//                               <div className="col-span-2">
//                                 <div class="flex items-center justify-center w-full">
//                                   <label
//                                     for="dropzone-file"
//                                     class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
//                                   >
//                                     <div class="flex flex-col items-center justify-center pt-5 pb-6">
//                                       <svg
//                                         class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//                                         aria-hidden="true"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="none"
//                                         viewBox="0 0 20 16"
//                                       >
//                                         <path
//                                           stroke="currentColor"
//                                           stroke-linecap="round"
//                                           stroke-linejoin="round"
//                                           stroke-width="2"
//                                           d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                                         />
//                                       </svg>
//                                       <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                                         <span class="font-semibold">
//                                           Click to upload
//                                         </span>{" "}
//                                         or drag and drop
//                                       </p>
//                                       <p class="text-xs text-gray-500 dark:text-gray-400">
//                                         SVG, PNG, JPG or GIF{" "}
//                                       </p>
//                                     </div>
//                                     <input
//                                       onChange={handleImage}
//                                       id="dropzone-file"
//                                       type="file"
//                                       class="hidden"
//                                     />
//                                     {previewImage && (
//                                       <img src={previewImage} className="" />
//                                     )}
//                                   </label>
//                                 </div>
//                               </div>
//                             </div>
//                           </form>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//                     <button
//                       type="button"
//                       className="inline-flex w-full justify-center rounded-md gap-2 align-center bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
//                       onClick={handelSubmit}
//                     >
//                       Sell Now
//                     </button>
//                     <button
//                       type="button"
//                       className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
//                       onClick={() => setOpen(false)}
//                       ref={cancelButtonRef}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition.Root>
//     </div>
//   );
// };

// export default SellBtn;
