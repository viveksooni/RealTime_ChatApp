const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors);

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewurlPraser: true,
//     useUnifiedTopology: true,
// //   })
//   .then(() => {
//     console.log("db connected");
//   });

app.listen(process.env.PORT, () => {
  console.log(`connected t port ${process.env.PORT}`);
});
