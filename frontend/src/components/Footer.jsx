import React from "react";
import { assets } from "../assets/assets";
import logo from "../assets2/aaron-logo.png";

const Footer = () => {
  return (
    <div className="w-full px-5 py-8">
      <div className="flex justify-between items-start gap-5 mb-8">
        {/* Left Section */}
        <div className="w-1/2 flex flex-col gap-5 text-left">
          <img className="w-20" src={logo} alt="Logo" />
          <p className="text-gray-400 text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident
            nihil harum quo animi explicabo eum delectus officia amet at, sit
            nam voluptates, iusto quia nostrum obcaecati iste porro perspiciatis
            laudantium!
          </p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 flex justify-between">
          <div className="flex flex-col items-start gap-4">
            <h1 className="font-bold">COMPANY</h1>
            <div className="text-gray-400 flex flex-col gap-2">
              <p>Home</p>
              <p>About us</p>
              <p>Delivery</p>
              <p>Privacy Policy</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h1 className="font-bold">Get In Touch</h1>
            <div className="text-gray-400 flex flex-col gap-2">
              <p>301-256-1212</p>
              <p>zhenghanlun0716@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-300 pt-4 text-center">
        <p className="text-gray-400 text-sm">
          Copyright 2024 @AaaronFang - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
