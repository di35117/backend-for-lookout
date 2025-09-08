import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_ANDROID_CLIENT_ID);

const googleSignIn = asyncHandler(async (req, res) => {
  console.log("omg");
  const { idToken } = req.body;
  console.log(idToken);

  if (!idToken) {
    throw new ApiError(400, "ID Token is required");
  }
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_ANDROID_CLIENT_ID,
  });
  
  const payload = ticket.getPayload();
  const googleId = payload["sub"];
  const username = payload["name"];
  if (!googleId) {
    throw new ApiError(400, "Invalid Google token");
  }
  let user = await User.findOne({ googleId });

  if (!user) {
    user = await User.create({
      googleId,
      username,
    });
  }
  req.login(user, (err) => {
    if (err) {
      throw new ApiError(500, "Failed to create user session");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User logged in successfully"));
  });
});

const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res
      .status(200)
      .json(new ApiResponse(200, {}, "User logged out successfully"));
  });
};
export { googleSignIn, logoutUser };
