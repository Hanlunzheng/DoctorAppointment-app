import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import path from "path";

//app config

const app = express();

const port = process.env.PORT || 4000;

const __dirname = path.resolve();

connectDB(); //connect to mongoose
connectCloudinary();

//MIDDLEWARES

app.use(express.json());
app.use(cors());

//api endpoint

app.use("/api/admin", adminRouter);
//localhost:4000/api/admin

app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.get("/", (req, res) => {
  res.send("api is working");
});

app.listen(port, () => {
  console.log("Server is running", port);
});
