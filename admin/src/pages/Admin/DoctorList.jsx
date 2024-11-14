import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {
  const { getAllDoctors, doctors, atoken, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);
  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="flex flex-wrap w-full gap-4 pt-5 gap-y-6">
        {doctors.map((doctor, index) => (
          <div
            className="border border-indigo-200 rounded0xl max-w-56 overflow-hidden cursor-pointer group"
            key={index}
          >
            <img
              className="bg-indigo-50 group-hover:bg-primary translate-all duration-200 w-full max-h-[220px] object-cover"
              src={doctor.image}
              alt=""
            />
            <div className="p-4">
              <p className="text-lg font-medium">{doctor.name}</p>
              <p className="text-zinc-600 text-sm">{doctor.speciality}</p>

              <div>
                <input
                  onChange={() => changeAvailability(doctor._id)}
                  type="checkbox"
                  checked={doctor.available}
                />
                <p>available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
