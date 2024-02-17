const Message = require("../models/msgModel");

module.exports.addmsg = async (req, res, next) => {
  try {
    const { users, message ,from} = req.body;
    console.log(users);
    const data = await Message.create({
      users: users,
      sender: from,
      message: { text: message },
    });

    if (data) {
      return res.json("message added successfully");
    } else {
      return res.json("message failed to addd");
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports.getmsg = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    console.log("from: " + from);
    console.log("to: " + to);

    const message = await Message.find({
      users: {
        $all: [from, to],
      },
    });
    console.log("message: ");
    console.log(message);
    const projectedMsg = message.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        msg: msg.message.text,
      };
    });
    console.log(projectedMsg);
    res.json(projectedMsg);
  } catch (ex) {
    next(ex);
  }
};
