import React, { useContext, useState } from "react";
// import { doctors } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctor = () => {
  const [more, setMore] = useState(false);
  const navigate = useNavigate();

  const { backendUrl, doctors } = useContext(AppContext);

  console.log("doctor data", backendUrl);
  return (
    <div className="flex flex-col justify-center items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-mediu">Top Doctors to Book</h1>
      <p className="text-center text-sm">
        simply browse through our extensive list of tursted doctors.
      </p>
      <div className="w-full grid grid-cols-4 gap-4 gap-y-6 px-3 sm:px-0">
        {more
          ? doctors.slice(0, 15).map((doctor, index) => (
              <div
                onClick={() => navigate(`/appointments/${doctor._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer"
                key={index}
              >
                <img className="bg-blue-50" src={doctor.image} alt="" />
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`flex justify-center items-center ${
                      doctor.available ? "text-green-500" : "text-gray-500"
                    }`}
                  >
                    <p
                      className={`w-2 h-2 rounded-full ${
                        doctor.available ? "bg-green-500" : "bg-gray-500"
                      }`}
                    ></p>
                    <p className>
                      {doctor.available ? "Available" : "Not Available"}
                    </p>
                  </div>

                  <p className="text-gray-900 text-lg font-medium">
                    {doctor.name}
                  </p>
                  <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                </div>
              </div>
            ))
          : doctors.slice(0, 10).map((doctor, index) => (
              <div
                onClick={() => navigate(`/appointments/${doctor._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer"
                key={index}
              >
                <img className="bg-blue-50" src={doctor.image} alt="" />
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`flex gap-1 justify-center items-center ${
                      doctor.available ? "text-green-500" : "text-gray-500"
                    }`}
                  >
                    <p
                      className={`w-2 h-2 rounded-full ${
                        doctor.available ? "bg-green-500" : "bg-gray-500"
                      }`}
                    ></p>
                    <p> {doctor.available ? "Available" : "Not Available"}</p>
                  </div>

                  <p className="text-gray-900 text-lg font-medium">
                    {doctor.name}
                  </p>
                  <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                </div>
              </div>
            ))}
      </div>
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setMore(!more)}
          className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
        >
          {more ? "Close" : "Show All"}
        </button>
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
        >
          Detail
        </button>
      </div>
    </div>
  );
};

export default TopDoctor;
