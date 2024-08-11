import React from "react";
import { Link } from "react-router-dom";
import plus from "../../assets/icons/basil_add-solid.png"

const AddBtn = () => {
  return (
    <Link to="/productAdd">
      <button className="flex items-center justify-center border-none rounded-md bg-gray-900 mt-2 p-1 px-2 text-teal-50 hover:bg-gray-700 ">
        <img src={plus} className="h-[25px]" alt="plus-icon" />
        sell
      </button>
    </Link>
  );
};

export default AddBtn;
