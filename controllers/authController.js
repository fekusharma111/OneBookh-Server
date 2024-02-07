import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import OTPModel from "../models/otpModel.js";

export const signup = async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    const role = req.body.role || "User";
    if (!email || !password || !otp) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    // Find the most recent OTP for the email
    const response = await OTPModel.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || parseInt(otp) !== parseInt(response[0].otp)) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }
    // Secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Hashing password error for ${password}: ` + error.message,
      });
    }
    const newUser = await User.create({
      name: `${email.match(/^(.+)@/)[1]}`,
      email,
      password: hashedPassword,
      role,
      lastloginTime: Date.now(),
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
