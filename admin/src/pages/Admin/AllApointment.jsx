import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const AllAppointment = () => {
  const { getAllAppointment, setAllAppointments, allAppointments, atoken } =
    useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllAppointment();
    }
  }, [atoken]); // Add atoken as a dependency to re-fetch when token changes.

  console.log(allAppointments);

  return (
    <div className="w-full max-w-6xl m-5 ">
      <p className="mb-3 text-lg font-medium">All appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Header Row */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient Name</p>
          <p>DOB</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fee</p>
          <p>Actions</p>
        </div>

        {/* Appointment Rows */}
        {allAppointments.map((appointment, index) => (
          <div
            className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-300"
            key={index}
          >
            <p className="max-sm:hidden mr-3">{index + 1}</p>
            {/* Patient Name */}
            <div className="flex items-center gap-2">
              <img
                className="w-12 rounded-full"
                src={appointment.userData.image}
                alt=""
              />
              <p>{appointment.userData.name}</p>
            </div>
            {/* Age */}
            <p>{appointment.userData.dob}</p>{" "}
            {/* Assuming dob represents age */}
            {/* Date & Time */}
            <p>{appointment.slotTime}</p>
            {/* Doctor */}
            <p>{appointment.docData.name}</p>
            {/* Fee */}
            <p>${appointment.docData.fees}</p>
            {/* Actions */}
            <p>Coming</p> {/* Placeholder for actions */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointment;
