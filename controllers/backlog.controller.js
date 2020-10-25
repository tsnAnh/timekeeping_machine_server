const zkObject = require("../config/zkObject");

//MODEL
const Backlog = require("../models/Backlog");
const Teacher = require("../models/Teacher");
const Attendance = require("../models/Attendance");
//CONTROLLER
const controllerNotification = require("./notification.controller");

const controller = {};

//---------------- API ------------------------------
//GET ALL BACKLOG
controller.getAllBacklogs = async (req, res) => {
  try {
    const backlogs = await Backlog.find();
    res.json(backlogs);
  } catch (error) {
    next(error);
  }
};

//GET BACKLOG TODAY
controller.getBacklogToday = async (req, res) => {
  const today = new Date().setHours(0, 0, 0, 0);

  try {
    const backlogToday = await Backlog.findOne({ time: today });
    res.json(backlogToday);
  } catch (error) {
    next(error);
  }
};
//DELETE ALL TIMEWORK
controller.deleteAllBacklogs = async (req, res) => {
  try {
    await Backlog.deleteMany();
    res.json("Deleted all backlogs");
  } catch (error) {
    next(error);
  }
};

controller.getBacklogOfTeacher = async (req, res) => {
  const { _id: teacherId } = req.teacher;

  try {
    const backlog = await Backlog.findOne({ teacherId });
    res.json(backlog);
  } catch (error) {
    next(error);
  }
};
controller.createBacklogForTeacher = async (req, res) => {
  const { _id: teacherId } = req.teacher;
  try {
    const newBacklog = await Backlog.create({
      teacherId,
    });
    res.json(newBacklog);
  } catch (error) {
    next(error);
  }
};
//---------------- TRACK ATTENDANCE ---------------------
//Realtime validate attendance
controller.realtimeAttendance = async (req, res) => {
  const zk = zkObject.node_zk;
  try {
    await zk.createSocket();
    console.log("Starting realtime attendance.....");

    await zk.getRealTimeLogs(async (ret) => {
      const { userId, attTime } = ret;
      const enrolledTime = new Date(attTime).getTime();
      const enrolledTeacher = await Teacher.findOne({
        "inMachine.uid": userId,
      });
      const today = new Date().setHours(0, 0, 0, 0);

      if (enrolledTeacher) {
        const backlogOfenrolledTeacher = await Backlog.findOne({
          teacherId: enrolledTeacher._id,
        });
        const totalDay = backlogOfenrolledTeacher.history.length;
        //CHECK if today is created in history backlog
        const isTodayCreated =
          totalDay > 0
            ? backlogOfenrolledTeacher.history[totalDay - 1].date == today
            : false;
        if (isTodayCreated) {
          backlogOfenrolledTeacher.history[totalDay - 1].enrolledTime.push({
            time: enrolledTime,
          });
        } else {
          backlogOfenrolledTeacher.history.push({
            date: today,
            enrolledTime: [{ time: enrolledTime }],
          });
        }
        await backlogOfenrolledTeacher.save();
      }

      //SAVE TO ATTENDANCE
      await Attendance.create({
        uid: enrolledTeacher ? enrolledTeacher._id : 0,
        time: enrolledTime,
      });
      console.log(`New attendance at ${attTime}`);
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = controller;
