import { promisify } from "util";
import jwt from "jsonwebtoken";
import UserModel from "../models/Users.js";

const protectRoute = async (req, res, next) => {
  try {
    // Get token from HTTP-only cookie
    const token = req.params;

    if (!token) {
      return res.status(401).json({ message: "You are not logged in!" });
    }

    // Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token!" });
    }

    // Check that user still exists
    const currentUser = await UserModel.findById(decoded.userId);
    if (!currentUser) {
      return res.status(401).json({ message: "User no longer exists!" });
    }

    // Attach user info to request
    req.user = currentUser;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({ message: "Unauthorized!" });
  }
};

export default protectRoute;
