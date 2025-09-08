import { Router } from "express";
import { googleSignIn, logoutUser } from "../controllers/auth.controller.js";
const router = Router();
router.route("/google/signin").post(googleSignIn);
router.route("/logout").get(logoutUser);
export default router;
