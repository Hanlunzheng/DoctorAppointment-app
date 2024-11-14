import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { userData, setUserData, backendUrl, token, loadUserProfileData } =
    useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false); // Track if we're in edit mode
  const [editedData, setEditedData] = useState(userData); // Store edited user data

  let formattedAddress = "";
  try {
    // If `userData.address` is a stringified JSON object, parse it
    if (typeof userData.address === "string") {
      const decodedAddress = JSON.parse(decodeURIComponent(userData.address));
      formattedAddress = `${decodedAddress.line1 || ""} ${
        decodedAddress.line2 || ""
      }`.trim();
    } else {
      formattedAddress = `${userData.address.line1 || ""} ${
        userData.address.line2 || ""
      }`.trim();
    }
  } catch (error) {
    console.error("Failed to parse address:", error);
    formattedAddress = "Address information is not available";
  }

  if (!userData) return <div>Loading...</div>;

  const handleEditClick = () => {
    setEditedData(userData);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setUserData(editedData); // Update the user data in context
    setIsEditing(false); // Exit edit mode
    updateUserProfileData();
  };

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editedData.name);
      formData.append("phone", editedData.phone);
      formData.append("dob", editedData.dob);
      formData.append("gender", editedData.gender);

      // Ensure address is properly formatted
      formData.append(
        "address",
        JSON.stringify({
          line1: editedData.address.line1,
          line2: editedData.address.line2,
        })
      );

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData(); // Reload the updated data from the server
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while saving the data.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(userData);

  return (
    <div className="flex flex-col items-center py-8 bg-gray-100 min-h-screen">
      {/* Profile Image */}
      <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg mb-6">
        <img
          src={userData.image}
          alt={`${userData.name}'s profile`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name */}
      <h1 className="text-2xl font-semibold text-gray-800">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedData.name}
            onChange={handleChange}
            className="text-lg border rounded-md p-1"
          />
        ) : (
          userData.name
        )}
      </h1>

      {/* Contact Details */}
      <div className="mt-4 bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700">
            Personal Details
          </h2>
          <p className="text-sm text-gray-600">
            Gender:{" "}
            {isEditing ? (
              <input
                type="text"
                name="gender"
                value={editedData.gender}
                onChange={handleChange}
                className="text-sm border rounded-md p-1"
              />
            ) : (
              userData.gender
            )}
          </p>
          <p className="text-sm text-gray-600">
            DOB:{" "}
            {isEditing ? (
              <input
                type="text"
                name="dob"
                value={editedData.dob}
                onChange={handleChange}
                className="text-sm border rounded-md p-1"
              />
            ) : (
              userData.dob
            )}
          </p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700">
            Contact Information
          </h2>
          <p className="text-sm text-gray-600">
            Email:{" "}
            {isEditing ? (
              <input
                type="text"
                name="email"
                value={editedData.email}
                onChange={handleChange}
                className="text-sm border rounded-md p-1"
              />
            ) : (
              userData.email
            )}
          </p>
          <p className="text-sm text-gray-600">
            Phone:{" "}
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={editedData.phone}
                onChange={handleChange}
                className="text-sm border rounded-md p-1"
              />
            ) : (
              userData.phone
            )}
          </p>
        </div>

        {/* Address */}
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700">Address</h2>
          {isEditing ? (
            <>
              <input
                type="text"
                name="line1"
                value={editedData.address.line1}
                onChange={(e) =>
                  setEditedData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line1: e.target.value,
                    },
                  }))
                }
                className="text-sm border rounded-md p-1 mb-2 w-full"
                placeholder="Line 1"
              />
              <input
                type="text"
                name="line2"
                value={editedData.address.line2}
                onChange={(e) =>
                  setEditedData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line2: e.target.value,
                    },
                  }))
                }
                className="text-sm border rounded-md p-1 w-full"
                placeholder="Line 2"
              />
            </>
          ) : (
            <pre className="text-sm text-gray-600">{formattedAddress}</pre>
          )}
        </div>

        <div className="flex justify-center mt-5">
          {isEditing ? (
            <button
              className="bg-green-500 py-3 px-8 text-white rounded-lg mr-2"
              onClick={handleSaveClick}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-primary py-3 px-8 text-white rounded-lg"
              onClick={handleEditClick}
            >
              Edit
            </button>
          )}
          {isEditing && (
            <button
              className="bg-red-500 py-3 px-8 text-white rounded-lg ml-2"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
