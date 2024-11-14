import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctor from "./pages/Doctor";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Profile from "./pages/Profile";
import MyAppoinment from "./pages/MyAppoinment";
import Appointments from "./pages/Appointments";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <h1 className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/doctors/:speciality" element={<Doctor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/my-appointments" element={<MyAppoinment />} />
        <Route path="/appointments/:docId" element={<Appointments />} />
      </Routes>
      <Footer />
    </h1>
  );
};

export default App;
