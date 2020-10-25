const { body } = require("express-validator");

//MODEL
const Teacher = require("../../models/Teacher");

//HELPERS
const { ErrorHandler } = require("../../helpers/error");
const validate = require("../../helpers/validate");
const Backlog = require("../../models/Backlog");

const validator = {};


validator.hasTeacher = async (req, res, next) => {
  const { teacherId } = req.params;

  try {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      throw new ErrorHandler(404, "Not found");
    }
    req.teacher = teacher;
    next();
  } catch (error) {
    next(error);
  }
};
validator.isTeacherBacklogCreated = async (req, res, next) => {
  const { _id:teacherId } = req.teacher;
  try {
    const isCreated = await Backlog.findOne({teacherId});
    if (isCreated) {
      throw new ErrorHandler(404, "Backlog for this teacher was created!!");
    }
    next();
  } catch (error) {
    next(error);
  }
};


validator.hasCardIdTeacher = async (req, res, next) => {
  const { cardId } = req.body;
  try {
    if (!cardId) {
      throw new ErrorHandler(422, "Card ID is required");
    }
    const hasExist = await Teacher.findOne({ "profile.cardId": cardId });
    if (hasExist) {
      throw new ErrorHandler(422, "Card ID already in use");
    }
    next();
  } catch (error) {
    next(error);
  }
};
validator.checkInput = (method) => {
  switch (method) {
    case "addTeacher":
      const name = body("name").not().isEmpty();
      const email = body("email").isEmail().normalizeEmail();

      return validate([name, email]);
  }
};
module.exports = validator;
