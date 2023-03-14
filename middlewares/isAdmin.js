const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  const user = await User.findOne({ email: req.email });
  console.log(user);
  if (user.admin) next();
  else {
    res.status(401).json({ error: "Unauthorized: user is not a admin" });
  }
};

module.exports = isAdmin;
