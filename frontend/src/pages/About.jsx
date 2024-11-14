import React from "react";
import { assets } from "../assets/assets";
import about from "../assets2/doctor-patient.webp";

const About = () => {
  return (
    <div className="">
      <div className="text-center pt-10">
        <p className="text-gray-500 font-bold text-[30px]">
          About <span>Us</span>
        </p>
      </div>
      <div className="flex items-center gap-5 my-10 ">
        <img className="w-full md:max-w-[360px]" src={about} alt="" />
        <div className="flex flex-col gap-5 mx-10 text-gray-500">
          <p>
            Welcome to Aaron Doctor Demo, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Aaron is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <b className="font-bold">Our Vision</b>
          <p>
            Our vision at Aaron is to create a seamless healthcare experience
            for every user. We aim to bridge the gap between patients and
            healthcare providers, making it easier for you to access the care
            you need, when you need it.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5">
        <h1>WHY CHOOSE US</h1>
        <div className="flex flex-col md:flex-row mb-20">
          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 cursor-pointer hover:bg-primary">
            <b>EFFICIENCY:</b>
            <p>
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 cursor-pointer  hover:bg-primary">
            <b>CONVENIENCE:</b>
            <p>
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 cursor-pointer  hover:bg-primary">
            <b>PERSONALIZATION:</b>
            <p>
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
