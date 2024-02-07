import otpGenerator from "otp-generator";
import User from "../models/userModel.js";
import OTPModel from "../models/otpModel.js";

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserPresent = await User.findOne({ email });
    // If user found with provided email
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User is already registered",
      });
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTPModel.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTPModel.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTPModel.create(otpPayload);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const otpExists = await OTPModel.findOne({ otp: otp });
    if (otpExists) {
      // If OTP exists, then check if the email matches the document found by OTP
      if (otpExists.email === email) {
        // Proceed if both OTP exists and email matches
        res.status(200).json({ success: true, error: "OTP verified and email matches." });
      } else {
        // if OTP exists but email does not match
        res.status(400).json({ success: false, error: "OTP verified but email does not match." });
      }
    } else {
      //if OTP does not exist
      res.status(404).json({ success: false, error: "OTP does not exist." });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
