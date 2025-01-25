import express from "express";
import { Login, Logout, Register } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").post(isAuthenticated, Logout);

export default router;
