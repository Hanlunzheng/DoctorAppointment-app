//api to register

import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import razorpay from "razorpay";

import userModel from "../models/userModel.js";

import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      return res.json({ success: false, message: "Missing details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter the valid email" });
    }

    if (password.length <= 8) {
      return res.json({
        success: false,
        message: "password must be greater than 8",
      });
    }
    //hash the password

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new userModel(userData);

    const user = await newUser.save();
    //_id

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api for user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "user not found!",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, message: "userLogin successfully", token });
    } else {
      res.json({ success: false, message: "invalid Credentials" });
    }
  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging purposes
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

//get user profile data

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//edit user profile

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;

    const imageFile = req.imageFile;

    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address,
      dob,
      gender,
    });

    if (imageFile) {
      // upload image to clouinary

      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndDelete(userId, { image: imageURL });
    }

    res.json({ success: true, message: "user profile update successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to book appointments

const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    if (!userId || !docId || !slotDate || !slotTime) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "doctor not available" });
    }
    let slots_booked = docData.slots_booked;

    // checking for slot availablity

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes[slotTime]) {
        return res.json({ success: false, message: "slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    //save new slot data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "appointment booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get user appointment in my-appointment pages

const listAppoiintments = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointment = await appointmentModel.find({ userId });

    res.json({ success: true, appointment });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to cancel the user appointment

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await appointmentModel.findByIdAndDelete(appointmentId);
    res.json({ success: true, message: "appointment have been deleted" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//api to make payment of appointment using razorpay
// const razorpayInstance = new razorpay({
//   key_id: "",
//   key_secret: "",
// });

// const paymentRazorpay = async () => {
//   try {
//   } catch (error) {}
// };

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppoiintments,
  cancelAppointment,
};
