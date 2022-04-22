import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import Admin from "../models/admin.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token, adminStatus: isadmin });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const adminStatus = async (req, res) => {
  const { email } = req?.query;
  const admin = await Admin.findOne({ email });

  let isadmin = false;
  if (admin) {
    isadmin = true;
  }
  res.status(200).json({ adminStatus: isadmin });
};

export const newadmin = async (req, res) => {
  const { email } = req?.body;
  const oldUser = await Admin.findOne({ email });

  if (oldUser) return res.status(400).json({ message: "User already exists" });

  if (email !== null) {
    const result = await Admin.create({ email: email });
  }
  res.status(201).json({});
};
