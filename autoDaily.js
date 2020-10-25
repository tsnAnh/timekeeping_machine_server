

//UTILS
const controllerBacklog = require("./controllers/backlog.controller");

module.exports = async () => {
  try {
    await controllerBacklog.realtimeAttendance();
  } catch (error) {
    console.log(error);
  }
};


