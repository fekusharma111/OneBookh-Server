import express from "express";
import { sendOTP } from "../controllers/otpController.js";
import { signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/signup", signup);

// router.post("/login", loginUser);
// router.post("/refreshToken", refreshToken);
// router.get("/validatePageRefreshLogin", verifyJWTToken, validatePageRefreshLogin);

// router.post("/createCategory", verifyJWTToken, createCategory);
// router.get("/getAllCategories", getAllActiveCategories);
// router.post("/updateCategory", verifyJWTToken, updateCategoryById);

// router.post("/createBlog", verifyJWTToken, createBlog);

export default router;
