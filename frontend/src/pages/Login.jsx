import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Sign up");

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { backendUrl, token, setToken } = useContext(AppContext);

  const formSubmission = async (e) => {
    e.preventDefault();

    try {
      if (state === "Sign up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={formSubmission}
      className="min-h-[80vh] flex items-center"
      action=""
    >
      <div className="flex flex-col items-start gap-4 m-auto p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg ">
        {state === "Sign up" ? (
          <div>
            <h1 className="font-bold text-lg">Create Account</h1>
            <p>Please sign up to book an appointment</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-lg">Login</h1>
            <p>Please login to book an appointment</p>
          </div>
        )}

        <div className="w-full flex flex-col gap-3">
          {state === "Sign up" && (
            <div>
              <label>Full name</label>
              <input
                className="w-full border border-[#DADADA] py-2 "
                type="text"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
        </div>

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
          {state === "Sign up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign up" ? (
          <div>
            <p>
              Already have an account?
              <span
                onClick={() => setState("Login")}
                className="text-primary cursor-pointer"
              >
                Login here
              </span>
            </p>
          </div>
        ) : (
          <div>
            <p>
              Need to create a new account?
              <span
                onClick={() => setState("Sign up")}
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
