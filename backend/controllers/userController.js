const { mongo, default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
module.exports.register = async (req, res, next) => {
  const { userName, email, password } = req.body;

  const userNameCheck = await User.findOne({ userName });

  if (userNameCheck) {
    return res.json({ msg: "userName already exists" });
  }
  const emailCheck = await User.findOne({ email });

  if (emailCheck) {
    return res.json({ msg: "email already exists" });
  }

  const hashedPassword = bcrypt.hash(password, 10);

  const user = await User.create({ email, userName, password: hashedPassword });
  delete user.password;
};
