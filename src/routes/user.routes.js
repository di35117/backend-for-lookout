import { Router } from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/profile").get(verifyJWT, getCurrentUser);
export default router;
