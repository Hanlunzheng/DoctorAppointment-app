//api for adding doctor
import validator from "validator";
// import bcrypt from "bcrypt";
import bcrypt from "bcryptjs";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

import jwt from "jsonwebtoken";

import { v2 as cloudinary } from "cloudinary";
import appointmentModel from "../models/appointmentModel.js";
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ message: "Image file is missing" });
    }
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res
        .status(400)
        .json({ success: false, message: " Missing details" });
    }

    // console.log(
    //   {
    //     name,
    //     email,
    //     password,
    //     speciality,
    //     degree,
    //     experience,
    //     about,
    //     fees,
    //     address,
    //   },
    //   imageFile
    // );

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "wrong email format" });
    }

    //validating the strong password

    if (password.length <= 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //encrypt the password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address), //convert object into json.parse
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/// api for admin login

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({ success: false, message: "invalid credientials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: error.message });
  }
};

// Api to get all the doctor display

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password"); // find the object but not displaying the password
    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
//api to get all appointment

const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api to get dashboard data for admin panel

const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashboardData = {
      doctors: doctors.length,
      users: users.length,
      appointments: appointments.length,
      lastestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, adminDashboard };
