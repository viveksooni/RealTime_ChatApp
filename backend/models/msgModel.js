const mongoose = require("mongoose");

const msgSchema = mongoose.Schema(
  {
    users: [],
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { text: { type: String, required: true } },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", msgSchema);
