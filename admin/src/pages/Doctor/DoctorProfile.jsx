import React, { useState } from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const {
    getProfileData,
    setProfileData,
    profileData,
    backendUrl,

    dToken,
    setDtoken,
  } = useContext(DoctorContext);

  const [isEditing, setIsEditing] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
        about: profileData.about,
      };
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEditing(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);
  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-primary w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>
          <div className="w-full border border-stone-100 rounded-lg bg-white p-8 py-7 ">
            <p className="font-bold text-lg text-center"> {profileData.name}</p>
            <div>
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button>{profileData.experience}</button>
            </div>
            <div>
              <p>About:</p>
              {isEditing ? (
                <textarea
                  className="w-full min-h-[20vh] border border-gray-500 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      about: e.target.value,
                    }))
                  }
                  value={profileData.about}
                />
              ) : (
                profileData.about
              )}
            </div>
            <p className="mt-5">
              Appointemnt fee:
              <span>
                $
                {isEditing ? (
                  <input
                    className="w-full border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    type="number"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>
            <div className="flex gap-2 ">
              <p>Address:</p>
              <div className="flex flex-col gap-2">
                <p>
                  {isEditing ? (
                    <input
                      className="w-full border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      type="text"
                      value={profileData.address?.line1}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                    />
                  ) : (
                    profileData.address?.line1
                  )}
                </p>
                <p>
                  {isEditing ? (
                    <input
                      className="w-full border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      type="text"
                      value={profileData.address?.line2}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                    />
                  ) : (
                    profileData.address?.line2
                  )}
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                checked={profileData.available}
                onChange={() =>
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                type="checkbox"
                name=""
                id=""
              />
              <label htmlFor="">Available</label>
            </div>
            <div className="flex justify-center items-center mt-5">
              {isEditing ? (
                <button
                  onClick={updateProfile}
                  className="py-2 px-5 bg-primary text-white border rounded-full "
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="py-2 px-5 bg-primary text-white border rounded-full "
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
