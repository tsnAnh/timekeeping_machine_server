const ZKLib = require("node-zklib/zklib");

const host = "192.168.51.252";
const port = 4370;

const zkObject = new ZKLib(host, port, 10000, 4000);

const controller = {};

controller.connect = async () => {
  try {
    await zkObject.createSocket();
  } catch (error) {
    console.log(error);
  }
};

controller.getUsers = async () => {
  try {
    const users = await zkObject.getUsers();
    console.log(users.data.length);
  } catch (error) {
    console.log(error);
  }
};
module.exports = controller;
