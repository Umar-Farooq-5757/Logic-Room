import User from "../models/User.js";

const registration = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const exists = await User.findOne({ where: { email: email } });
    if (exists)
      return res.json({ success: false, message: "Email already exists." });
    const user = await User.create({ username, email, passwordHash: password });
    res.json({success:true,message:"User created successfully"})
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};


export default {registration}