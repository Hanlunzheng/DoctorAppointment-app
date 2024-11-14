import React from "react";

import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

import noBg from "../assets2/doctor-nobg.avif";

const Banner = () => {
  const naviagte = useNavigate();
  return (
    <div className="flex w-full h-1/3  bg-primary justify-center items-center rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-10 md:mx-10">
      {/* left */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl sm:text-2xl text-white  font-semibold">
          <p>Book Appointment</p>
          <p className="">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            naviagte("/about");
            scrollTo(0, 0);
          }}
          className="bg-white text-sm sm:text-base px-8 py-3 rounded-full mt-6 "
        >
          About Us
        </button>
      </div>

      {/* right */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img className="w-[120%] " src={assets.doc2} alt="" />
      </div>
    </div>
  );
};

export default Banner;
