import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppoinment = () => {
  const { backendUrl, token } = useContext(AppContext);

  const [appointment, setAppointment] = useState([]);

  const getUserAppointment = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });

      if (data.success) {
        setAppointment(data.appointment.reverse()); // Use reverse() to reverse the order
        console.log(data.appointment);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      // console.log(appointmentId);
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.success);
        getUserAppointment();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointment();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12  font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div className="">
        {appointment.map((item, index) => (
          <div
            className="grid grid-cols-[1fe_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-zinc-650">
              <p className="text-neutral-800">{item.docData.name}</p>
              <p>{item.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address?.line1}</p>
              <p className="text-xs">{item.docData.address?.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-xs text-neutral-700 font-medium">
                  Date & Time:
                </span>
                {item.slotTime}
              </p>
            </div>

            <div className="flex flex-col gap-3 justify-end">
              <button className="bg-primary text-white text-sm text-center sm_min-w-46 border rounded">
                Pay online
              </button>
              <button
                onClick={() => cancelAppointment(item._id)}
                className="bg-green-400 text-white text-sm text-center sm_min-w-46 border rounded px-10"
              >
                Cancel appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppoinment;
