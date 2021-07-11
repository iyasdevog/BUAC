const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./Routers/userRoutes");
const ClassRouters = require("./Routers/ClassRouters");
const subjectRouters = require("./Routers/subjectRouter");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

mongoose
  .connect(" mongodb://127.0.0.1:27017/Attendance", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));
const app = express();
const port = 4000;
app.use(express.json());
app.use("/API/V1/subjects", subjectRouters);

app.use("/API/v1/user", userRoutes);
app.use("/API/v1/classes", ClassRouters);

app.listen(port, () => {
  console.log(`you are listening on port ${port}`);
});
