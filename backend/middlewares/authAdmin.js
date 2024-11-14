import jwt from "jsonwebtoken";

// admin auth middleware

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorized login again",
      });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      res.json({ success: false, message: "Not Authorized login again" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// const authAdmin = async (req, res, next) => {
//   try {
//     const atoken =
//       req.headers.atoken || req.headers.authorization?.split(" ")[1];

//     if (!atoken) {
//       return res.status(401).json({
//         success: false,
//         message: "Not Authorized. Please log in again.",
//       });
//     }

//     const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

//     // Assuming token contains isAdmin field or similar for admin check
//     if (!token_decode || token_decode.email !== process.env.ADMIN_EMAIL) {
//       return res
//         .status(403)
//         .json({ success: false, message: "Access denied." });
//     }

//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Authentication error." });
//   }
// };

export default authAdmin;
