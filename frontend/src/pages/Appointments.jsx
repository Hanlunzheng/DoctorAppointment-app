import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { doctors } from "../assets/assets";
import App from "../App";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Appointments = () => {
  const { docId } = useParams();
  const navigate = useNavigate();

  const [docSlots, setDocSlots] = useState([]);

  const dayofWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const { doctors, getDoctorsData, backendUrl, token } = useContext(AppContext);
  // console.log(doctors);

  const [docInfo, setDocInfo] = useState(null);
  const [related, setRelated] = useState([]);

  const fetchDocInfo = () => {
    const docInfo = doctors.find((doctor) => doctor._id === docId);
    setDocInfo(docInfo);
  };

  const fetRelatedInfo = () => {
    if (docInfo) {
      const relatedDoctors = doctors.filter(
        (doctor) =>
          doctor.speciality === docInfo.speciality && doctor._id !== docInfo._id
      );
      setRelated(relatedDoctors);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("login to book appointment");
      return navigate("/login");
    }
    try {
      const date = docSlots[slotIndex][0].dateTime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    // getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // set end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // set hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleDateString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        // add slot to array
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });

        // increase time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId]);

  useEffect(() => {
    fetRelatedInfo();
  }, [docInfo]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4">
        {docInfo && (
          <>
            <img
              className="bg-primary w-full h-[300px] sm:max-w-[300px] rounded-lg"
              src={docInfo.image}
              alt=""
            />
            <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
              <div className="flex flex-col justify-center items-start gap-4">
                <div>
                  <h1 className="font-bold text-[30px]">{docInfo.name}</h1>
                  <p className="text-gray-500">
                    {docInfo.degree} - {docInfo.speciality}
                  </p>
                </div>
                <div>
                  <p className="text-lg">About</p>
                  <p className="text-gray-500">{docInfo.about}</p>
                </div>
                <h1>Appointment Fee: ${docInfo.fees}</h1>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="sm :ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking slot</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.length > 0 &&
            docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                key={index}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? "bg-primary text-white"
                    : "border border-gray-500"
                }`}
              >
                {/* Display date */}
                <p>{item[0] && dayofWeek[item[0].dateTime.getDay()]}</p>
                <p>{item[0] && item[0].dateTime.getDate()}</p>

                {/* Display time slots */}
              </div>
            ))}
        </div>
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots.length > 0 &&
            docSlots[slotIndex] &&
            docSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                key={index} // add a unique key for each item
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime
                    ? "bg-primary text-white"
                    : "text-gray-400"
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>
      </div>

      <div className="mt-5">
        <button
          onClick={bookAppointment}
          className="bg-primary px-20 py-2  text-white border rounded-full text-sm "
        >
          Book an appointment
        </button>
      </div>

      {/* Related Doctors Section */}
      {related.length > 0 && (
        <div className="mt-8">
          <h1 className="text-center text-[30px]">Related Doctors</h1>
          <p className="text-gray-500 text-center mb-4">
            Browse through our extensive list of trusted doctors
          </p>
          <div className="w-full grid grid-cols-2 md:grid-cols-6 gap-2 gap-y-4">
            {related.map((doctor) => (
              <div
                key={doctor._id}
                onClick={() => navigate(`/appointments/${doctor._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer"
              >
                <img
                  className="bg-blue-50 w-full  object-cover"
                  src={doctor.image}
                  alt=""
                />
                <div className="flex flex-col items-center text-center p-2">
                  <p className="text-green-500 text-xs">Available</p>
                  <p className="text-gray-900 text-sm font-medium">
                    {doctor.name}
                  </p>
                  <p className="text-gray-600 text-xs">{doctor.speciality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Appointments;
