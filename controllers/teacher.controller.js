//MODEL
const Teacher = require("../models/Teacher");

const controller = {};

//GET ALL TEACHERS
controller.getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    next(error);
  }
};
//ADD NEW TEACHER
controller.addTeacher = async (req, res, next) => {
  const { name, cardId, email } = req.body;
  try {
    const newTeacher = await Teacher.create({
      profile: {
        name,
        cardId,
        email,
      },
    });
    res.json(newTeacher);
  } catch (error) {
    next(error);
  }
};
//DELETE TEACHER
controller.deleteTeacher = async (req, res, next) => {
  const { teacher } = req;
  try {
    await Teacher.deleteOne({ _id: teacher._id });
    res.json("Deleted teacher sucessfully");
  } catch (error) {
    next(error);
  }
};
//DELETE ALL TEACHERS
controller.deleteAllTeachers = async (req, res, next) => {
  try {
    await Teacher.deleteMany();
    res.json("Deleted all teachers");
  } catch (error) {
    next(error);
  }
};
module.exports = controller;
