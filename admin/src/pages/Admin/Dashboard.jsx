import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { dashData, getDashboardData, atoken } = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getDashboardData();
    }
  }, [atoken]);
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-50">
            <div>
              <img src={assets.doctor_icon} alt="" />
            </div>
            <div>
              <p className="text-xl font-semibold">{dashData.doctors}</p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-50">
            <div>
              <img src={assets.patients_icon} alt="" />
            </div>
            <div>
              <p className="text-xl font-semibold">{dashData.users}</p>
              <p className="text-gray-400">Patent</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-50">
            <div>
              <img src={assets.appointment_icon} alt="" />
            </div>
            <div>
              <p className="text-xl font-semibold">{dashData.appointments}</p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
        </div>
        <div className="bg-white ">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>
          <div className="pt-4 border border-t-0">
            {dashData.lastestAppointments.map((item, index) => (
              <div className="flex items-center  gap-2 mt-2 " key={index}>
                <img className="w-14" src={item.docData.image} alt="" />
                <div>
                  <p>{item.docData.name}</p>
                  <p>{item.slotTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
