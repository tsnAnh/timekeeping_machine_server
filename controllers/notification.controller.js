const axios = require("axios");
const controller = {};

controller.alertAttendance = async (email, subject, enrolledTime) => {
  const { data: user } = await axios.get(
    `http://localhost:5001/admin/user/${email}`
  );
  let content = "";
  if (subject.timeline.start >= enrolledTime) {
    content = "VKU tự hào về cậu!!! Đi học sớm lắm người ae";
  } else {
    content = `Trễ có ${
      (subject.timeline.start - enrolledTime) / 1000
    } giây thôi à. Lần sau đi sớm hơn nha`;
  }
  await axios.post(`http://localhost:5001/admin/notification/${user._id} `, {
    subject: subject.name,
    content,
  });
};
module.exports = controller;
