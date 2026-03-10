import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registration = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password)
      return res.json({ success: false, message: "Missing fields" });

    const exists = await User.findOne({ where: { email: email } });
    if (exists)
      return res.json({ success: false, message: "Email already exists." });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash });
    res.json({ success: true, message: "Account created successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.json({ success: false, message: "Missing fields" });

    const user = await User.findOne({ where: { email: email } });
    if (!user) return res.json({ success: false, message: "Email not found" });
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid credentials" });
    const token = generateToken(user.id);
    res.json({ success: true, message: "User logged in", token });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const getUserData = async (req, res) => {
  try {
    const user = await User.findByPk(req.user, {
      attributes: { exclude: ["passwordHash"] },
    });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default { registration, login, getUserData };
