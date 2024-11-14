import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  // const [] = useState("");

  console.log(name);

  const { backendUrl, atoken } = useContext(AdminContext);
  const formsubmission = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        return toast.error("image not selected");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("email", email);
      formData.append("name", name);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));

      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      ); // convert object into a string

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setAddress1("");
        setAbout("");
        setAddress2("");
        setEmail("");
        setFees("");
        setPassword("");
        setDegree("");
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <form onSubmit={formsubmission} className="m-5 w-full">
      <p>Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll text-gray-600">
        <div className="flex items-center gap-5 mb-5">
          <label htmlFor="doc-img">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              required
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload Doctor <br />
            Picture
          </p>
        </div>
        <div className="flex  justify-between gap-7 ">
          <div className="w-full flex-1 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p>Doctor Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <p>Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="email"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <p>Doctor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="password"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <p>Doctor Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-3 h-10"
                name=""
                id=""
              >
                <option value="1 year">1 Year</option>
                <option value="2 year">2 Year</option>
                <option value="3 year">3 Year</option>
                <option value="4 year">4 Year</option>
                <option value="5 year">5 Year</option>
                <option value="6 year">6 Year</option>
                <option value="7 year">7 Year</option>
                <option value="8 year">8 Year</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <p>fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="fee"
                required
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded px-3 h-10"
                name=""
                id=""
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <p>Degree</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Degree"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address2"
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-4">
          <p>About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full h-60 border"
            placeholder="write about doctor"
            name=""
            id=""
            required
          ></textarea>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="bg-primary border rounded-full text-white px-8 py-4"
          >
            Add doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
