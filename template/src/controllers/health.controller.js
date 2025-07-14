export const healthStatus = (req, res) => {
  res.status(200).json({ suceess: true, message: "health ok!" });
};
