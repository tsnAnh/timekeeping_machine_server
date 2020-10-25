const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  time: {
    type: Number,
  },
  uid: {
    type: String,
  },
});
module.exports = mongoose.model("Attendance", attendanceSchema, "Attendance");
