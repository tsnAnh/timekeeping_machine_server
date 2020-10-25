require("dotenv").config();

const express = require("express");
var cors = require("cors");
const { handleError } = require("./helpers/error");

//SET UP
const app = express();
app.use(cors());
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("API running"));

//FIREBASE
// const admin = require("firebase-admin");
// const serviceAccount = require("./config/my-vku-firebase-adminsdk-5biis-428e2d3928.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://my-vku.firebaseio.com",
// });

// CONNECT DB
const connectDB = require("./config/db");
connectDB();

//AUTOMATIC DAILY
const autoDaily = require("./autoDaily");
autoDaily();

// process.setMaxListeners(12);
//DEFINE ROUTE
app.use("/api/machines", require("./routes/api/machine.api"));
app.use("/api/backlogs", require("./routes/api/backlog.api"));
app.use("/api/teachers", require("./routes/api/teacher.api"));
app.use("/api/attendances", require("./routes/api/attendance.api"));

// HANDLE ERROR
app.use((err, req, res, next) => {
  handleError(err, res);
});
//FOR DEVELOPMENT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
