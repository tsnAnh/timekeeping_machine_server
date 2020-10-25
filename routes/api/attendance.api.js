const router = require("express").Router();

//CONTROLLER
const controller = require("../../controllers/attendance.controller");

//MIDDLEWARE
// const auth = require('../middleware/auth.middle');

// @route   GET api/attendance
// @desc    Get all attendances
// @access  Private
router.get("/", controller.getAllAttendances);

// @route   DELETE api/attendance/
// @desc    Delete all attendances
// @access  Private
router.delete("/", controller.deleteAllAttendances);

module.exports = router;
