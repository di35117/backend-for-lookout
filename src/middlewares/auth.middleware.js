import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  throw new ApiError(401, "Unauthorized request. Please log in.");
});
