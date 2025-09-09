import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User profile fetched successfully"));
});
const getLeaderboard = asyncHandler(async (req, res) => {
  const leaderboard = await User.find({})
    .sort({ score: -1 })
    .limit(7)
    .select("username score");

  if (!leaderboard) {
    throw new ApiError(404, "Leaderboard data not found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, leaderboard, "Top 7 players fetched successfully")
    );
});
export { getCurrentUser, getLeaderboard };
