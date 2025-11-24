import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {

  const navigate = useNavigate();   
  const { token } = useAppContext();  


  return (
    <div className="flex justify-between items-center shadow p-5 sticky top-0 bg-gray-100 z-100">
      <img
        onClick={() => navigate("/")}
        src="https://i.pinimg.com/originals/f6/fe/f9/f6fef919159fc1f8bf9c7ff56fe82954.jpg"
        alt="logo"
        className="w-14 cursor-pointer" 
      />
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
      >
        {token ? 'Dashboard' : 'Login'}
        <img
          src="https://png.pngtree.com/png-vector/20231223/ourmid/pngtree-white-right-arrow-icon-3d-png-image_11203467.png"
          alt="arrow"
          className="w-3"
        />
      </button>
    </div>
  );
};

export default Navbar;
