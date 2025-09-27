import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.SecretKey_URL);
      if (!decoded || !decoded.role || !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: "Access Denied" });
      }
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
};

export default checkRole;
