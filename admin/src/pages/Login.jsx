import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";

import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");

  const { setAtoken, backendUrl, atoken, two } = useContext(AdminContext);
  //   const backendUrl = "http://localhost:4000";

  const { dToken, setDtoken } = useContext(DoctorContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmission = async (e) => {
    e.preventDefault();

    // try {
    //   if (state === "Admin") {
    //     const { data } = await axios.post(backendUrl + "/api/admin/login", {
    //       email,
    //       password,
    //     });

    //     if (data.success) {
    //       localStorage.setItem("aToken", data.token);
    //       setAtoken(data.token);
    //     } else {
    //       toast.error(data.message);
    //     }
    //   } else {
    //   }
    // } catch (error) {
    //   console.log(error);
    //   toast.error(error.message);
    // }
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAtoken(data.token); // Store token in context
          toast.success("Login successful!");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDtoken(data.token);
          // console.log(dToken);
          toast.success("Login successful!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  console.log(email);
  console.log(password);
  console.log(two);

  console.log(backendUrl);
  console.log(atoken);
  return (
    <form
      onSubmit={formSubmission}
      className="min-h-[80vh] flex items-center"
      action=""
    >
      <div className="flex flex-col items-start gap-4 m-auto p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg ">
        {state === "Admin" ? (
          <div>
            <h1 className="font-bold text-lg">Admin Login</h1>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-lg">Doctor Login</h1>
          </div>
        )}

        <div className="w-full flex flex-col gap-3">
          <label>Email</label>
          <input
            className="w-full border border-[#DADADA] py-2"
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col gap-3">
          <label>Password</label>
          <input
            className="w-full border border-[#DADADA] py-2"
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-primary w-full py-3 mt-2 text-white rounded-md"
        >
          {state === "Admin" ? "Login" : "Login"}
        </button>

        {state === "Admin" ? (
          <div>
            <p>
              Doctor Login?
              <span
                onClick={() => setState("Doctor")}
                className="text-primary cursor-pointer"
              >
                Click here
              </span>
            </p>
          </div>
        ) : (
          <div>
            <p>
              Admin Login?
              <span
                onClick={() => setState("Admin")}
                className="text-primary cursor-pointer"
              >
                Click here
              </span>
            </p>
          </div>
        )}
      </div>
    </form>
  );
};

export default Login;
