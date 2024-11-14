import React, { useContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctor = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();

  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(
        doctors.filter((doctor) => doctor.speciality === speciality)
      );
    } else {
      setFilterDoc(doctors);
    }
  };
  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  console.log(speciality);
  return (
    <div className="">
      {/* left */}
      <div className=" flex   items-start gap-8 mt-5">
        <div className="flex flex-col gap-4 ">
          <button
            onClick={() => navigate("/doctors/General physician")}
            className="bg-white w-full text-gray-400 border rounded-md border-gray-200 py-2 px-4 text-sm text-left"
          >
            General physician
          </button>
          <button
            onClick={() => navigate("/doctors/Gynecologist")}
            className="bg-white w-full text-gray-400 border rounded-md border-gray-200 py-2 px-4 text-sm text-left"
          >
            Gynecologist
          </button>
          <button
            onClick={() => navigate("/doctors/Dermatologist")}
            className="bg-white w-full text-gray-400 border rounded-md border-gray-200 py-2 px-4 text-sm text-left"
          >
            Dermatologist
          </button>
          <button
            onClick={() => navigate("/doctors/Pediatricians")}
            className="bg-white w-full text-gray-400 border rounded-md border-gray-200 py-2 px-4 text-sm text-left"
          >
            Pediatricians
          </button>
          <button
            onClick={() => navigate("/doctors/Neurologist")}
            className="bg-white w-full text-gray-400 border rounded-md border-gray-200 py-2 px-4 text-sm text-left"
          >
            Neurologist
          </button>
          <button
            onClick={() => navigate("/doctors/Gastroenterologist")}
            className="bg-white w-full text-gray-400 border rounded-md border-gray-200 py-2 px-4 text-sm text-left"
          >
            Gastroenterologist
          </button>
          <button
            onClick={() => navigate("/doctors")}
            className="bg-white w-full text-gray-400 border rounded-md border-gray-200 py-2 px-4 text-sm text-left"
          >
            All
          </button>
        </div>
        <div className="w-full grid grid-cols-4 gap-4 gap-y-6">
          {filterDoc.slice(0, 15).map((doctor, index) => (
            <div
              onClick={() => navigate(`/appointments/${doctor._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer"
              key={index}
            >
              <img className="bg-blue-50" src={doctor.image} alt="" />
              <div className="flex flex-col items-center text-center">
                <p
                  className={`${
                    doctor.available ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {doctor.available ? "Available" : "Not Available"}
                </p>
                <p className="text-gray-900 text-lg font-medium">
                  {doctor.name}
                </p>
                <p className="text-gray-600 text-sm">{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* right */}
    </div>
  );
};

export default Doctor;
