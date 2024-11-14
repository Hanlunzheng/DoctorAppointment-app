import express from "express";

import {
  addDoctor,
  adminDashboard,
  allDoctors,
  appointmentsAdmin,
  loginAdmin,
} from "../controllers/adminController.js";

import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailablity } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/all-doctors", authAdmin, allDoctors);

adminRouter.post("/login", loginAdmin);

adminRouter.post("/change-availability", authAdmin, changeAvailablity);

adminRouter.get("/appointments", appointmentsAdmin);

adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;