import jwt from "jsonwebtoken";
import { ResponseUtils } from "../utils/response.utils.js";
const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return ResponseUtils(res, 401, false, "User not authenticated");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return ResponseUtils(res, 401, false, "Invalid or malformed token");
    }
    //
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error during Authentication:", error);
    return ResponseUtils(res, 500, false, "Internal Server Error");
  }
};
export default isAuthenticated;
