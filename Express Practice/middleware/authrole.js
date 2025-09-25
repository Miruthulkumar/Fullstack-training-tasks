const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const role = req.headers["role"] || "guest"; // default to guest
    if (!allowedRoles.includes(role)) {
      console.log(role);
      return res.status(403).json({ error: "Access Denied" });
    }
    next();
  };
};

export default checkRole;
