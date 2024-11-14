import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppoiintments,
  cancelAppointment,
} from "../controllers/userController.js";
import authAdmin from "../middlewares/authAdmin.js";
import authUser from "../middlewares/authUser.js";
import multer from "multer";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/get-profile", authUser, getProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);
userRouter.get("/appointments", authUser, listAppoiintments);

userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

export default userRouter;
