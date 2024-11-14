import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";

const DoctorAppointment = () => {
  const {
    backendUrl,
    dToken,
    setDtoken,
    getAppointments,
    setAppointments,
    appointments,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);
  console.log(appointments);
  return (
    <div className="w-full max-2-6xl m-5">
      <p className="mb-3 text-lg font-medium">All appointment</p>
      <div className="bg-white border rouned texxt-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>DOB</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div
            className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b"
            key={index}
          >
            <p>{index + 1}</p>
            <div className="flex flex-cols justify-start items-center gap-2 ">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>

            <p>${item.amount}</p>
            <p>{item.userData.dob}</p>
            <p>{item.slotTime}</p>
            <p>${item.docData.fees}</p>
            <p>TBD</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
