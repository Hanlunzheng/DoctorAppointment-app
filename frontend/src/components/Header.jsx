import React from "react";

import { assets } from "../assets/assets";

import { useNavigate } from "react-router-dom";
import headder from "../assets2/doctors-banner.avif";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 mt-10">
      {/* left */}
      <div className="w-1/2 flex flex-col justify-center items-start gap-5">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-3">
          Book Appointment <br /> With Doctors
        </p>

        <div className="flex items-center justify-center gap-5">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p className="text-white">
            simply through our extensive list of trusted doctors <br />
            schedule your appointment hassle-free
          </p>
        </div>
        <button
          onClick={() => navigate("/doctors")}
          className="px-8 py-3 bg-white border-rounded text-black cursor-pointer border-red-600 rounded-full"
        >
          Book appointment
        </button>
      </div>
      {/* right */}
      <div className="w-1/2">
        <img src={headder} alt="" />
      </div>
    </div>
  );
};

export default Header;
