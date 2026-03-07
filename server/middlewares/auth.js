import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded.id;
      return next();
    } catch (err) {
      return res.status(401).json({ success: false, message: "Token failed" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }
};
export default protect;
