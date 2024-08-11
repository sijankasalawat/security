import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import profile from "../../assets/images/p.png";
import { searchProductApi } from "../../Apis/Api";
import sec from "../../assets/images/second.png";
import AddBtn from "./AddBtn";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.length > 3) {
        console.log("Searching for:", query);
        handleSearchClick(query);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearchClick = async (query) => {
    try {
      const response = await searchProductApi(query);
      console.log("API Response:", response.data);
      if (response.data.success) {
        setSearchResults(response.data.products);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSearchItemClick = (product) => {
    setQuery("");
    setShowResults(false);
    setSearchResults([]);
    navigate(`/productDetail/${product._id}`);
  };

  const userImage = user?.avatar ? user?.avatar : profile;

  return (
    <>
      <header className="bg-white lg:h-[50px] h-[40px] flex justify-center">
        <div className="container flex justify-between items-center pt-1 px-2">
          <Link to="/dashboard" className="logo flex gap-2 align-middle">
            <img src={sec} alt="logo" className="lg:h-[40px] h-[24px]" />
            <h1 className="lg:text-[22px] font-bold text-gray-700 lg:block hidden">Second</h1>
          </Link>
          <div className="align-middle">
            {user ? (
              <div className="flex gap-3 align-middle">
                <div className="relative lg:block hidden" ref={searchRef}>
                  <form>
                    <label
                      htmlFor="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        value={query}
                        type="search"
                        id="default-search"
                        className="block mt-2 p-4 ps-10 text-sm h-[35px] w-[400px] text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Electronic, machines..."
                        onChange={(event) => setQuery(event.target.value)}
                        required
                      />
                    </div>
                  </form>

                  {showResults && (
                    <div className="search-results absolute bg-white border top-[100%] left-0 border-gray-300 rounded-lg shadow-lg mt-2 w-[400px]">
                      {searchResults.length > 0 ? (
                        searchResults.map((product, idx) => (
                          <div
                            onClick={() => handleSearchItemClick(product)}
                            key={idx}
                            className="flex cursor-pointer gap-2 p-2 hover:bg-gray-100"
                          >
                            <img
                              src={product.productImage}
                              alt={product.brandName}
                              className="lg:h-[40px] h-[24px]"
                            />
                            <p>{product.brandName}</p>
                          </div>
                        ))
                      ) : (
                        <div className="p-2">No results found</div>
                      )}
                    </div>
                  )}
                </div>
                <div className="hidden lg:block">
                  <AddBtn />
                </div>

                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="mt-2">
                      <div className="logo">
                        <img
                          src={userImage}
                          alt="logo"
                          className="lg:h-[40px] h-[24px] rounded-full hover:grayscale-[50%] grayscale-0"
                        />
                      </div>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Account settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/ProductAdd"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Your Product
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Message
                            </a>
                          )}
                        </Menu.Item>
                        <hr />
                        <form method="POST" action="#">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={logout}
                                type="submit"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block w-full px-4 py-2 text-left text-sm"
                                )}
                              >
                                Logout
                              </button>
                            )}
                          </Menu.Item>
                        </form>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              <>
                <div className="gap-2 flex items-center justify-center">
                  <Link
                    className=" hover:text-sky-600 text-gray-950 "
                    type="submit"
                    to="/"
                  >
                    Login
                  </Link>
                  <div className="solid"></div>
                  <Link
                    to="/register"
                    className="border border-gray-900 rounded-md p-1 hover:bg-gray-800 hover:text-white"
                    type="submit"
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
