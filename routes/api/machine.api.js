const router = require("express").Router();
//MIDDLEWARE
const validator = require("../middleware/validator.middle");

//CONTROLLER
const controller = require("../../controllers/machine.controller");

// @route   GET api/machine/attendance
// @desc    Get all attendances from machine
// @access  Private
router.get("/attendance", controller.getAllAttendances);

// @route   DELETE api/machine/attendance
// @desc    Delete all attendances from machine
// @access  Private
router.delete("/attendance", controller.deleteAllAttendances);

// @route   GET api/machine/user
// @desc    Get all user in machine
// @access  Private
router.get("/user", controller.getAllUsers);


// @route   POST api/machine/teacher/:teacherId
// @desc    Add new teacher or udapte info of teacher to machine
// @access  Private
router.post(
  "/teacher/:teacherId",
  validator.hasTeacher,
  controller.addAndUpdateTeacher
);

// @route   DELETE api/machine/user/:uid
// @desc    Delete a user
// @access  Private
router.delete("/user/:uid", controller.deleteUser);

// @route   POST api/machine/time
// @desc    Set current time for machine
// @access  Private
router.post("/time", controller.setTime);

/**
 * @route DELETE api/machine/templates
 * @description Get all fingerprint templates from machine
 * @access private
 */
router.get("/templates", controller.getAllTemplates);

module.exports = router;
