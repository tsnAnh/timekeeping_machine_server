const zkObject = require("../config/zkObject");
//HELPERS
const { ErrorHandler } = require("./../helpers/error");

//MODEL
const Attendance = require("../models/Attendance");
const Teacher = require("../models/Teacher");
// CONSTANTS
// const {  } = require("../constants");

const controller = {};
// GET ALL ATTENDANCES
controller.getAllAttendances = async (req, res, next) => {
  const zk = zkObject.node_zk;

  try {
    await zk.createSocket();
    const attendances = await zk.getAttendances();
    res.json(attendances);
    await zk.disconnect();
  } catch (error) {
    next(error);
  }
};
// DELETE ALL ATTENDANCES
controller.deleteAllAttendances = async (req, res, next) => {
  const zk = zkObject.zk;

  try {
    await zk.connect(async (err, ret) => {
      if (err) return res.status(500).json("Error Server");
      await zk.clearAttendanceLog((err) => {
        if (err) return res.status(500).json("Error Server");
        zk.disconnect();
        res.json("Deleted all attendances successfully!!!");
      });
    });
  } catch (error) {
    next(error);
  }
};
//---------------------API----------------------

//GET ALL USERS
controller.getAllUsers = async (req, res, next) => {
  const zk = zkObject.zk;

  try {
    await zk.connect(async (err, ret) => {
      if (err) return res.status(500).json("Error Server");
      await zk.getUser((err, users) => {
        if (err)
          return res.status(500).json("Error when get all user in machine ");
        res.json(users);
        zk.disconnect();
      });
    });
  } catch (error) {
    next(error);
  }
};
//SET TIME FOR MACHINE
controller.setTime = async (req, res) => {
  const zk = zkObject.zk;

  try {
    await zk.connect(async (err, ret) => {
      if (err)
        return res.status(500).json("Error when set current time for machine");

      await zk.setTime(new Date(), (err) => {
        if (err)
          return res
            .status(500)
            .json("Error when set current time for machine");

        res.json("Updated time");
        zk.disconnect();
      });
    });
  } catch (error) {
    next(error);
  }
};

// CREATE TEACHER TO MACHINE DB
controller.addAndUpdateTeacher = async (req, res, next) => {
  const { teacher } = req;
  const uidMachine = parseInt(teacher.profile.cardId.replace(/\D/g, ""));
  const zk = zkObject.zk;

  try {
    zk.connect((err) => {
      if (err) return res.status(500).json("Error when add teacher to machine");

      zk.setUser(
        uidMachine,
        "123456",
        `${"TEACHER-" + teacher.profile.name + "-" + teacher.profile.cardId}`,
        `${uidMachine}`,
        async (err, ret) => {
          zk.disconnect();
          if (err)
            return res.status(500).json("Error when add teacher to machine");

          await Teacher.findOneAndUpdate(
            { "profile.cardId": teacher.profile.cardId },
            { "inMachine.uid": uidMachine }
          );
          res.json("Add teacher to machine successfully");
        }
      );
    });
  } catch (error) {
    next(error);
  }
};
// DELETE A USER
controller.deleteUser = async (req, res, next) => {
  const { uid } = req.params;
  const zk = zkObject.zk;

  try {
    await zk.connect(async (err, ret) => {
      if (err) return res.status(500).json("Error when delete user");

      await zk.delUser(parseInt(uid), (err) => {
        zk.disconnect();
        if (err) return res.json("Error when delete user");
        res.json("Delete user sucessfully");
      });
    });
  } catch (error) {
    next(error);
  }
};
//DELETE A STUDENT FROM MACHINE
controller.deleteStudent = async (req, res, next) => {
  const { student } = req;
  if (!student.inMachine.uid) {
    next();
  }
  const zk = zkObject.zk;

  try {
    await zk.connect(async (err, ret) => {
      if (err) return res.status(500).json("Error Server");

      await zk.delUser(student.inMachine.uid, (err) => {
        zk.disconnect();
        if (err) return res.json("Error when delete student");
        next();
      });
    });
  } catch (error) {
    next(error);
  }
};
//DELETE A TEACHER FROM MACHINE
controller.deleteTeacher = async (req, res, next) => {
  const { teacher } = req;
  if (!teacher.inMachine.uid) {
    next();
  }
  const zk = zkObject.zk;

  try {
    await zk.connect(async (err, ret) => {
      if (err) return res.status(500).json("Error when delete teacherr");

      await zk.delUser(teacher.inMachine.uid, (err) => {
        zk.disconnect();
        if (err) return res.json("Error when delete teacher");
        next();
      });
    });
  } catch (error) {
    next(error);
  }
};

//DELETE ALL USERS
//TODO:FIX
controller.deleteAllUsers = async (req, res, next) => {
  try {
    const students = await Student.find().lean();
    const uidMachineArr = students.map((student) => student.inMachine.uid);

    await zkObject.zk.connect(async (err, ret) => {
      if (err) return res.status(500).json("Error Server");
      const studetnsCount = uidMachineArr.length - 1;
      const deletedStudents = [];
      const delUser = async () => {
        for (let i = 0; i <= studetnsCount; i++) {
          await zkObject.zk.delUser(uidMachineArr[i], (err) => {
            console.log(err);
            if (!err) {
              console.log(students[i]._id);
              deletedStudents.push(students[i]._id);
            }
          });
        }
      };
      await delUser();
      zkObject.zk.disconnect();
      console.log(deletedStudents);
      req.deletedStudents = deletedStudents;
      req.students = students;
      next();
    });
  } catch (error) {
    next(error);
  }
};

controller.getAllTemplates = async (req, res, next) => {
  try {
    await zkObject.node_zk.executeCmd(0x03eb);
    const fp = await zkObject.node_zk.executeCmd(0x07d0);
    console.log(fp);
    await zkObject.node_zk.executeCmd(0x05df, data=0107000200000000000000);
    console.log(fp);
  } catch (error) {
    console.error(error);
  } finally {
    await zkObject.node_zk.executeCmd(0x03ea);
    res.end();
  }
};


module.exports = controller;
