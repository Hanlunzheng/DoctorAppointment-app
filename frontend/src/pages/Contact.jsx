import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center py-10 ">
        <p className="text-2xl">
          Contact <span className="text-gray-700 font-semibold">Us</span>
        </p>

        <div className="flex flex-col md:flex-row justify-center  my-10 gap-10">
          <img
            className="w-full md:max-w-[360px]"
            src={assets.contact_image}
            alt=""
          />
          {/* info */}
          <div className="flex flex-col gap-6 justify-center  items-start">
            <div className="flex flex-col items-start ">
              <span className="font-semibold text-lg text-gray-600">
                Our Office
              </span>
              <p className="text-gray-500">000000</p>
            </div>
            <div className=" flex flex-col items-start">
              <span className="font-semibold text-lg text-gray-600">
                Carrers at Aaron
              </span>
              <p className="text-gray-500">learn more</p>
            </div>
            <button className="bg-primary px-8 py-4 border rounded-sm hover:text-white transition-all duration-500">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
