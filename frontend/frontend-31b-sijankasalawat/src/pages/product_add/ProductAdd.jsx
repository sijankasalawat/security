import "../component/SellBtn.jsx";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import React, { useEffect } from "react";
import plus from "../../assets/icons/basil_add-solid.png";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { createProductApi, deleteProductApi, getProductsByUserIdApi, getProductDetailById, updateProductApi } from "../../Apis/Api.js";
import { toast } from "react-toastify";
import ReactLoading from 'react-loading';
import product from "../../assets/icons/product.png";


const ProductAdd = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [editProductId, setEditProductId] = useState(null)
  const [brandName, setBrandName] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [time, setTime] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [products, setProducts] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const [deleteProductId, setDeleteProductId] = useState(null); // Define deleteProductId state
  const [deleteProductDialog, setDeleteProductDialog] = useState({ open: false, productId: null });


  // load all products when page loads
  useEffect(() => {
    getProductsByUserIdApi(userId)
      .then((res) => {
        // Handle the response from the server
        if (res.data && res.data.success === false) {
          toast.error(res.data.message);
        } else if (res.data && res.data.success === true) {
          setProducts(res.data.products);
        } else {
          toast.error("Unknown response format from the server");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal server error");
      });
  }, []);

  const handleImage = (event) => {
    const file = event.target.files[0];
    setProductImage(null)
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // ...
  const handelSubmit = async (e) => {
    try {
      e.preventDefault();
      // Append various form fields to the FormData object
      const formData = new FormData();
      formData.append("category", category);
      formData.append("brandName", brandName);
      formData.append("details", details);
      formData.append("contactNo", contactNo);
      formData.append("address", address);
      formData.append("time", time);
      formData.append("price", price);
      formData.append("productImage", productImage);
      setIsLoading(true)

      if (editProductId) {
        const res = await updateProductApi(formData, editProductId)
        if (res.data && res.data.success === false) {
          toast.error(res.data.message);
        } else if (res.data && res.data.success === true) {
          toast.success(res.data.message);
          setOpen(false);
          setEditProductId(null)
        }
      } else {
        // Send request to backend API
        const res = await createProductApi(formData)
        // Handle the response from the server
        if (res.data && res.data.success === false) {
          toast.error(res.data.message);
        } else if (res.data && res.data.success === true) {
          toast.success(res.data.message);
          setOpen(false);
          setProducts((prevProducts) => [...prevProducts, res.data.product]);
        }
      }
    }
    catch (err) {
      console.log(err);
      const message = err?.response?.data?.message || err?.message || 'Something went wrong';
      toast.error(message);
    } finally {
      setIsLoading(false)
    }
  };
  const handleDelete = async () => {
    try {
      // Call the API to delete the product
      const response = await deleteProductApi(deleteProductId); // Use deleteProductId state here

      // Check if the delete operation was successful
      if (response.data.success) {
        // Update your state or perform any other necessary actions
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== deleteProductId)
        );
        console.log('Product deleted successfully:', response.deletedProduct);
        toast.success('Product deleted successfully');
      } else {
        // Handle error, display a message, etc.
        console.error('Failed to delete product:', response.message);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };


  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);


  const handleProductAdd = () => {
    setEditProductId(null)
    setBrandName("");
    setPrice("");
    setDetails("");
    setCategory("");
    setAddress("");
    setContactNo("");
    setTime("");
    setProductImage(null);
    setPreviewImage(null);
    console.log("Sell button clicked!");
    setOpen(true);
  };
  const handelDeleteBtn = (productId) => {
    console.log("delete button clicked for productId:", productId);
    setDeleteProductId(productId); // Set the deleteProductId state here
    console.log("deleteProductId:", deleteProductId); // Log the deleteProductId state
    setDeleteProductDialog({ open: true, productId });

  };



  const handleEditProduct = async (product) => {
    try {
      setEditProductId(product._id);
      const response = await getProductDetailById(product._id);
      console.log('response: ', response);
      if (response.data && response.data.success === true) {
        const productData = response.data.product;
        console.log('productData: ', productData);

        setBrandName(productData.brandName)
        setPrice(productData.price)
        setDetails(productData.details)
        setCategory(productData.category)
        setAddress(productData.address)
        setContactNo(productData.contactNo)
        setTime(productData.time)
        setProductImage(productData.productImage)
        setOpen(true)
      } else {
        console.error('Failed to get product detail:', response.data.message);
      }
    } catch (error) {
      console.error('Error calling product detail API:', error);
    }
  }

  return (
    <div className="bg-gray-100">
      <div className="container px-2 pt-3">
        <div className="total-product p-2 gap-4  bg-white rounded-md w-fit flex justify-between items-center" >
          <img src={product} alt="product" className="h-[40px] w-[40px] p-1 bg-sky-500 rounded-md" />
          <div >
            <h1 >Total product:</h1>
            <h1 className="text-sky-500 text-[25px] font-bold">
              {products.length}
            </h1>
          </div>


        </div>



        <div className="relative">
          {/* The "Sell" button */}
          <button
            className="flex items-center justify-center border-none rounded-md bg-sky-500 mt-2 p-1 px-2 text-teal-50 hover:bg-sky-700 "
            onClick={handleProductAdd}
          >
            <img src={plus} className="h-[25px]" alt="plus-icon" />

            Add Your Product
          </button>

          {/* The dialog */}
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={() => setOpen(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >

                    <Dialog.Panel className="relative transform overflow-auto h-[85vh] rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      {isLoading ? <><div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 h-full w-full flex justify-center items-center">
                        <ReactLoading type={'balls'} color={'blue'} height={50} />
                      </div></> : <>
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                          <div className="sm:flex sm:items-start  flex justify-center">
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                              <Dialog.Title
                                as="h3"
                                className="text-base font-semibold leading-6 text-gray-900"
                              >
                                {
                                  editProductId ? 'Edit ' : 'Add '
                                }
                                Your Product
                              </Dialog.Title>
                              <div className="mt-2">
                                <form className="p-4 ">
                                  <div className="grid gap-2 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                      <label
                                        for="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Brand Name
                                      </label>
                                      <input
                                        value={brandName}
                                        onChange={(e) => {
                                          setBrandName(e.target.value);
                                        }}
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                        required=""
                                      />
                                    </div>
                                    <div className="col-span-2">
                                      <label
                                        for="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Contact No
                                      </label>
                                      <input
                                        value={contactNo}
                                        onChange={(e) => {
                                          setContactNo(e.target.value);
                                        }}
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                        required=""
                                      />
                                    </div>
                                    <div className="col-span-2">
                                      <label
                                        for="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Address
                                      </label>
                                      <input
                                        value={address}
                                        onChange={(e) => {
                                          setAddress(e.target.value);
                                        }}
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                        required=""
                                      />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                      <label
                                        for="price"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Price
                                      </label>
                                      <input
                                        value={price}
                                        onChange={(e) => {
                                          setPrice(e.target.value);
                                        }}
                                        type="number"
                                        name="price"
                                        id="price"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Rs 2999"
                                        required=""
                                      />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                      <label
                                        for="category"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Category
                                      </label>
                                      <select
                                        value={category}
                                        onChange={(e) => {
                                          setCategory(e.target.value);
                                        }}
                                        id="category"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      >
                                        <option selected="">
                                          Select category
                                        </option>
                                        <option value="Automobile">
                                          Automobile
                                        </option>
                                        <option value="Electronic">
                                          Electronic
                                        </option>
                                      </select>
                                    </div>
                                    <div className="col-span-2">
                                      <label
                                        for="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Product Details
                                      </label>
                                      <textarea
                                        value={details}
                                        onChange={(e) => {
                                          setDetails(e.target.value);
                                        }}
                                        id="description"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write product description here"
                                      ></textarea>
                                    </div>
                                    <div className="col-span-2">
                                      <div class="flex items-center justify-center w-full">
                                        <label
                                          for="dropzone-file"
                                          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                        >
                                          <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                              class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                              aria-hidden="true"
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 20 16"
                                            >
                                              <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                              />
                                            </svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                              <span class="font-semibold">
                                                Click to upload
                                              </span>{" "}
                                              or drag and drop
                                            </p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                              SVG, PNG, JPG or GIF{" "}
                                            </p>
                                          </div>
                                          <input
                                            onChange={handleImage}
                                            id="dropzone-file"
                                            type="file"
                                            name="productImage"
                                            className="hidden"
                                          />

                                          {(previewImage || productImage) && (
                                            <img
                                              src={previewImage || productImage}
                                              className="w-full h-50"
                                            />
                                          )}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>

                      </>}
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md gap-2 align-center bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
                          onClick={handelSubmit}
                        >
                          {
                            (editProductId ? 'Update' : 'Add')}
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>

                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
          {products.map((product) => {
            return (
              <div className="m-1 mx-2 mt-3">
                <div class="max-w-sm rounded overflow-hidden shadow-lg h-full">
                  <img
                    class="w-full h-[200px] object-cover  hover:scale-110"
                    src={product.productImage}
                    alt="product"
                  />
                  <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">
                      {product.BrandName}
                    </div>
                    <p class="text-gray-700 text-base truncate">{product.details}</p>
                  </div>
                  <div class="px-6 pt-4 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {product.category}
                    </span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-green-500 mr-2 mb-2">
                      {product.price}
                    </span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {product.address}
                    </span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {product.contactNo}
                    </span>
                  </div>
                  <div className="flex justify-end gap-1 px-6 pb-3">
                    <button
                      onClick={() => handleEditProduct(product)}
                      type="button"
                      className="inline-flex w-full justify-center rounded-md gap-2 align-center bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 sm:ml-3 sm:w-auto"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handelDeleteBtn(product._id)} // Pass productId as a parameter
                      type="button"
                      className="inline-flex w-full justify-center rounded-md gap-2 align-center bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 sm:ml-3 sm:w-auto"
                    >
                      delete
                    </button>


                    <Transition.Root show={deleteProductDialog.open} as={Fragment}>
                      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => setDeleteProductDialog({ ...deleteProductDialog, open: false })}>
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div className="fixed inset-0  bg-gray-400 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                              enterTo="opacity-100 translate-y-0 sm:scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                  <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        Delete Product
                                      </Dialog.Title>
                                      <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                          Are you sure you want to delete your product
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

                                  <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={() => handleDelete(deleteProductId)} // Use deleteProductId state or pass productId directly
                                  >
                                    delete
                                  </button>

                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition.Root>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;
