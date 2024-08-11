import React, { useEffect, useState } from "react";
import { getProductByCategoryApi } from "../../Apis/Api"; // Assuming getProductByCategoryApi is the correct API function
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

// ElectronicProduct component
const ElectronicProduct = ({ products }) => {
  const [showAllProducts, setShowAllProducts] = useState(false);

  const displayedProducts = showAllProducts ? products : products.slice(0, 6);

  return (
    <>
      <div className="all-product container pt-3">
        <div className="flex justify-between mx-2">
          <h1 className="lg:text-[22px] font-bold text-gray-700">
            All Electronic Products
          </h1>
          {!showAllProducts && (
            <a
              className="lg:text-[20px] text-gray-700 underline hover:text-sky-500 cursor-pointer"
              onClick={() => setShowAllProducts(true)}
            >
              View All
            </a>
          )}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 md:grid-col-3">
          {displayedProducts.map((product) => {
            return (
              <Link key={product._id} to={`/productDetail/${product._id}`} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3 overflow-hidden hover:shadow-xl">
                <img className="rounded-t-lg h-[100px] md:h-[150px] lg:h-[200px] w-full object-cover hover:scale-110" src={product.productImage} alt="" />
                <div className="p-5">
                  <h2 className="mb-2 text-sm lg:text-2xl md:text-xlfont-bold text-gray-900">{product.brandName}</h2>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate">{product.details}</p>
                  <span class="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-green-500 mr-2 mb-2">
                      {product.price}
                    </span>
                  {/* <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-500 rounded-lg hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    View Details
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </button> */}
                </div>
              </Link>
            );
          })}
        </div>
        <hr />
      </div>
    </>
  );
};

export default ElectronicProduct;
