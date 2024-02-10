const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: { type: String, required: true, min: 3, max: 20, unique: true },
  password: { type: String, required: true, min: 8, unique: true },
  email: { type: String, required: true, max: 50 },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  AvatarImage: { type: String, default: "" },
});

module.exports = mongoose.model("Users",userSchema)
