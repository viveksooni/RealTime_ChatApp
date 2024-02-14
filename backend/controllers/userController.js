const { mongo, default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
module.exports.register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    const userNameCheck = await User.findOne({ userName });

    if (userNameCheck) {
      return res.json({ msg: "userName already exists" });
    }
    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
      return res.json({ msg: "email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    if (!user) {
      return res.json({
        msg: "User Name or Password is incorrect",
        status: false,
      });
    }
    passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.json({
        msg: "User Name or Password is incorrect",
        status: false,
      });
    }

    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
