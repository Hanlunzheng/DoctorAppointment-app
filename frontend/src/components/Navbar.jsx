import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import logo from "../assets2/aaron-logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const { token, setToken, userData } = useContext(AppContext);

  const [dropDown, setDropDown] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };
  return (
    <div className="flex items-center justify-between test-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-20 cursor-pointer"
        src={logo}
        alt=""
      />
      <ul className="md:flex hidden items-start gap-5 font-medium ">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden " />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden " />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden " />
        </NavLink>
        <NavLink to="contact">
          <li className="py-1">Contacts</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden " />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
         <button
          className="bg-primary px-4 py-2 border rounded-full text-white"
          onClick={() =>
            window.open(
              "https://doctorappointment-app-admin.onrender.com",
              "_blank"
            )
          }
        >
          admin panel
        </button>
        {token && userData ? (
          <div className="flex justify-center items-center gap-4">
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <img
              className="w-2.5"
              onClick={() => setDropDown(!dropDown)}
              src={assets.dropdown_icon}
              alt=""
            />
            {dropDown ? (
              <div className="absolute top-0 right-2  pt-14 text-base font-medium text-gray-600 z-2">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="cursor-pointer"
                >
                  my profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="cursor-pointer"
                >
                  my appoinment
                </p>
                <p onClick={logout} className="cursor-pointer">
                  logout
                </p>
              </div>
            ) : null}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
