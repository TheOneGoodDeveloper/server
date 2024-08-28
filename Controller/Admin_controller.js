import { UserModel } from "../Model/User_scheme.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "Evvi_solutions_private_limited";

export const admin_check = (req, res) => {
  const { mail, password } = req.body;

  UserModel.findOne({ mail: mail.toLowerCase() })
    // .select( -password )
    .then((users) => {
      console.log(users);
      if (users.role == "admin" && users.password == password) {
        const token = jwt.sign(
          { id: users._id, role: users.role, mail: users.mail },
          JWT_SECRET,
          { expiresIn: "5h" }
        );
        console.log(token);
        return res.status(200).header("auth-token", token).json({
          status: true,
          message: "Success",
          data: users,
        });
      }
    })
    .catch((error) => {
      return res
        .status(200)
        .json({ status: false, role: "", message: "failure" });
    });
};

export const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"] ? req.headers["authorization"]: "";
  if (!token) {
    return res
      .status(200)
      .json({ status: false, message: "Token not provided" });
  }
  // token = token.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(200)
          .json({ status: false, statusCode: 700, message: "Token expired" });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Invalid token" });
      }
    }

    req.user = decoded;
    next();
  });
};

export const admin_dashboard = (req, res) => {
  console.log(req.user);
  res.status(200).json({ message: "success" });
};

export const getAllUserEmpMail = async (req, res) => {
  await UserModel.find({}, { mail: 1, name: 1, _id: 0 })
    .then((emails) => {
      if (emails) {
        res
          .status(200)
          .json({ status: true, message: "get all user mail", data: emails });
      }
    })
    .catch((error) => {
      res
        .status(200)
        .json({ status: false, message: "Error in Fetching Users Email" });
    });
};
