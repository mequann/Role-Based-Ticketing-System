const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Signup
exports.signup = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// login 
exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ error: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
      // const payload={
      //   username: user.username,
      //   id: user._id, 
      //   role: user.role 
        
      // }
  
      const token = jwt.sign({  id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      // Return user and token
      res.json({ 
        user: { id: user._id, username: user.username, role: user.role }, 
        token 
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };