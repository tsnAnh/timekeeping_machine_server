const router = require("express").Router();

//CONTROLLER
const controller = require("../../controllers/backlog.controller");

//MIDDLEWARE
// const auth = require('../middleware/auth.middle');
const validator = require('../middleware/validator.middle');

// @route   GET api/backlogs
// @desc    Get all backlogs
// @access  Private
router.get("/", controller.getAllBacklogs);

// @route   GET api/backlogs/:teacherId
// @desc    Get a backlog of a teacher
// @access  Private
router.get("/:teacherId", validator.hasTeacher,controller.getBacklogOfTeacher);

// @route   POST api/backlogs/:teacherId
// @desc    Create a backlog for a teacher
// @access  Private
router.post("/:teacherId",validator.hasTeacher,validator.isTeacherBacklogCreated, controller.createBacklogForTeacher);

// @route   DELETE api/backlogs/
// @desc    Delete all backlogs
// @access  Private
router.delete("/", controller.deleteAllBacklogs);

module.exports = router;
