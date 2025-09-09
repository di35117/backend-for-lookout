import { Router } from "express";
import {
  getCurrentUser,
  getLeaderboard,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/leaderboard").get(getLeaderboard);
router.route("/profile").get(verifyJWT, getCurrentUser);

export default router;
