const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    console.log("No Authorization header found");
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  // Extract the token from the "Bearer <token>" format
  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("Invalid token format");
    return res
      .status(401)
      .json({ error: "Access denied. Invalid token format." });
  }
  // console.log("JWT_SECRET:", process.env.JWT_SECRET);
  // console.log("Token to Verify:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(400).json({ error: "Invalid token" });
  }
};
