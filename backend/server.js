const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config()
app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", require("./routes/authRoute"));
app.use("/", require("./routes/courseRoute"));
app.use("/users", require("./routes/userRoute"));
app.use("/enroll-course", require("./routes/enrollRoute"));



const PORT = process.env.PORT || 5000;
mongoose
  .connect("mongodb+srv://Muskan:muskan198@cluster0.rqhyigo.mongodb.net/course")
  .then(() => {
    console.log("Database connected...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Error occurred");
  });
