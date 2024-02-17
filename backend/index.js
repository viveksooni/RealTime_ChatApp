const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const msgRoute = require("./routes/msgRoute");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoute);
app.use("/api/messages", msgRoute);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(process.env.PORT, () => {
  console.log(`connected to port ${process.env.PORT}`);
});
