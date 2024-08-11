import React, { useEffect, useState } from "react";
import img1 from "../../assets/images/slide1.png";
import AddBtn from "../component/AddBtn";
import AllProduct from "../component/AllProduct";
import ElectronicProduct from "../Electronic/ElectronicProduct";
import { getProductByCategoryApi } from "../../Apis/Api"; // Import getProductByCategoryApi
import Automobile from "../Automobile/Automobile";
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import all from "../../assets/images/all.jpg"
import electronic from "../../assets/images/electronic.jpg"
import automobile from "../../assets/images/automobile.jpg"

import img2 from "../../assets/images/slide2.png"
import img3 from "../../assets/images/slide3.png"


const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("All"); // State to store selected category
  const [filteredProducts, setFilteredProducts] = useState([]); // State to store filtered products

  useEffect(() => {
    // Fetch all products initially
    fetchProducts("All");
  }, []);
  const fadeImages = [
    { url: img1 },
    { url: img2 },
    { url: img3 }
  ];

  const fetchProducts = (category) => {
    getProductByCategoryApi(category) // Fetch products based on category
      .then((res) => {
        if (res.data && res.data.success === true) {
          setFilteredProducts(res.data.products);
        } else {
          console.error("Failed to fetch products:", res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchProducts(category); // Fetch products when a category is selected
  };

  return (
    <>
      <div className="dashboard-main w-full">

        <div className="dashboard-img w-full h-full bg-gray-100 p-3">
          <div className="slide-container">
          <Fade in={true}>
      {fadeImages.map((fadeImage, index) => (
        <div key={index}>
          <img src={fadeImage.url} className="w-full lg:h-[300px] h-[200px] md:h-[300px] rounded-lg static" alt={`fade-image-${index}`} />
        </div>
      ))}
    </Fade>
          </div>
          <div className="relative bottom-[10px] pl-3 right-0 mr-10 mb-4 mt-[-50px] ">
            <AddBtn />
          </div>
        </div>
        <div className="bg-gray-100">
          <div className="categories container px-2 pb-3">
            <h1 className="lg:text-[24px] font-bold text-gray-700">
              Categories
            </h1>
            <hr />
            <div className="catego-img flex gap-4">
              <div
                className={`catego pt-3 ${selectedCategory === "All" && "active"}`}
                onClick={() => handleCategoryClick("All")}
              >
                <img
                  src={all}
                  alt="all"
                  className="h-[80px] w-[80px] rounded-md"
                />
                <p className="font-bold">All</p>
              </div>
              <div
                className={`catego pt-3 ${selectedCategory === "Electronic" && "active"}`}
                onClick={() => handleCategoryClick("Electronic")}
              >
                <img
                  src={electronic}
                  alt="electronic"
                  className="h-[80px] w-[80px] rounded-md "
                />
                <p className="font-bold">Electronic</p>
              </div>
              <div
                className={`catego pt-3 ${selectedCategory === "Automobile" && "active"}`}
                onClick={() => handleCategoryClick("Automobile")}
              >
                <img
                  src={automobile}
                  alt="automobile"
                  className="h-[80px] w-[80px] rounded-md"
                />
                <p className="font-bold">Automobile</p>
              </div>
            </div>
          </div>
        </div>
        <AllProduct />

        <ElectronicProduct products={filteredProducts.filter(product => product.category === "Electronic")} />
        <Automobile products={filteredProducts.filter(product => product.category === "Automobile")} />
      </div>
    </>
  );
};

export default Dashboard;
