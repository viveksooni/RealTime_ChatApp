const Message = require("../models/msgModel");

module.exports.addmsg = async (req, res, next) => {
  try {
    const { users, message ,from} = req.body;
 
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
   

    const message = await Message.find({
      users: {
        $all: [from, to],
      },
    });
    
  
    const projectedMsg = message.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        msg: msg.message.text,
      };
    });
   
    res.json(projectedMsg);
  } catch (ex) {
    next(ex);
  }
};
