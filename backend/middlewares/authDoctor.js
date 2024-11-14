import jwt from "jsonwebtoken";

//admin auth middleware

// const authDoctor = async (req, res, next) => {
//   try {
//     const { dToken } = req.headers;

//     if (!dToken) {
//       return res.json({
//         success: false,
//         message: "Not Authorized login again",
//       });
//     }

//     const token_decode = jwt.verify(dToken, process.env.JWT_SECRET);

//     req.body.docId = token_decode.id;

//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: true, message: error.message });
//   }
// };

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, please log in again",
      });
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

    req.body.docId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Invalid token, please log in again",
    });
  }
};

export default authDoctor;
