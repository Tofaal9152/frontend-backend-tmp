import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import { ResponseUtils } from "../utils/response.utils.js";
import jwt from "jsonwebtoken";
// Register
export const Register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return ResponseUtils(res, 400, false, "All fields are required");
    }
    const user = await User.findOne({ email });
    if (user) {
      return ResponseUtils(res, 400, false, "User already exists");
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
      fullName,
      email,
      password: hashPassword,
    });
    return ResponseUtils(res, 201, true, "Registration successful", {
      id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return ResponseUtils(res, 500, false, "Internal Server Error");
  }
};
// Login
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return ResponseUtils(res, 400, false, "All fields are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return ResponseUtils(res, 400, false, "Invalid email or password");
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return ResponseUtils(res, 400, false, "Invalid email or password");
    }
    // jwt
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // cookie
    res.status(200).cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 86400000, // 1d in milisecond
    });
    return ResponseUtils(res, 200, true, "Log in successfully");
  } catch (error) {
    console.error("Error during Login:", error);
    return ResponseUtils(res, 500, false, "Internal Server Error");
  }
};
// logout
export const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });
    return ResponseUtils(res, 200, true, "Logout successfully");
  } catch (error) {
    console.error("Error during Logout:", error);
    return ResponseUtils(res, 500, false, "Internal Server Error");
  }
};
