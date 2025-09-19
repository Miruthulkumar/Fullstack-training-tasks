const logTimestamp = (req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] Request to: ${req.method} ${req.url}`);
  next();
};

export default logTimestamp;
