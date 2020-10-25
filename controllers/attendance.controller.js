//MODEL
const Attendance = require("../models/Attendance");

const controller = {};

//GET ALL ATTENDANCES
controller.getAllAttendances = async (req, res, next) => {
  try {
    const attedances = await Attendance.find();
    res.json(attedances);
  } catch (error) {
    next(error);
  }
};

//DELETE ALL ATTENDANCES
controller.deleteAllAttendances = async (req, res, next) => {
  try {
    await Attendance.deleteMany();
    res.json("Deleted all attendances");
  } catch (error) {
    next(error);
  }
};
module.exports = controller;
