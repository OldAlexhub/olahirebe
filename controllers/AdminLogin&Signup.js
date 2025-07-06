import AdminModel from "../models/Admins.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminSignup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      company,
      city,
      state,
      zipCode,
    } = req.body;

    // Check if user exists
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    if (password != confirmPassword) {
      return res.status(401).json({ message: `Passwords don't match!` });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin
    const newAdmin = new AdminModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      company,
      city,
      state,
      zipCode,
    });

    await newAdmin.save();

    res
      .status(201)
      .json({ success: true, message: "Admin registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, message: "Signup failed", error });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const name = `${admin.firstName} ${admin.lastName}`;
    const Isadmin = admin.role;
    const company = admin.company;
    const userId = admin.user_id;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      name,
      company,
      Isadmin,
      userId,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Login failed", error });
  }
};

export const SentInfo = async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const companyInfo = await AdminModel.findOne({ user_id: userId });

    if (!companyInfo) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Here you go", companyInfo });
  } catch (error) {
    console.error("SentInfo error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
