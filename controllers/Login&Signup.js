import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      dateOfBirth,
      phoneNumber,
      city,
      state,
      zipCode,
    } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(401).json({ message: `User already exist!` });
    }

    if (password != confirmPassword) {
      return res.status(401).json({ message: `Passwords don't match` });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dateOfBirth,
      phoneNumber,
      city,
      state,
      zipCode,
    });

    await newUser.save();

    res.status(201).json({ message: `Account created successufly` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Server error` });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: `Wrong credentials, please try again` });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: `Wrong credentials, please try again` });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const name = `${user.firstName} ${user.lastName}`;
    const userId = user.user_id;

    res.status(200).json({ message: `Login Success`, name, userId, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: `Server error` });
  }
};
