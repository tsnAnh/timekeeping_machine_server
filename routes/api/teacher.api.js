const router = require("express").Router();

//MIDDLEWARE
const validator = require("../middleware/validator.middle");

//CONTROLLER
const controllerTeacher = require("../../controllers/teacher.controller");
const controllerMachine = require("../../controllers/machine.controller");

// @route   GET api/teachers
// @desc    Get all teachers
// @access  Public
router.get("/", controllerTeacher.getAllTeachers);

// @route   POST api/teachers
// @desc    Add a new teacher
// @access  Private
router.post(
  "/",
  validator.checkInput("addTeacher"),
  validator.hasCardIdTeacher,
  controllerTeacher.addTeacher
);

// @route   DELETE api/teachers/:teacherId
// @desc    Delete a teacher
// @access  Private
router.delete(
  "/:teacherId",
  validator.hasTeacher,
  controllerTeacher.deleteTeacher
);
module.exports = router;
