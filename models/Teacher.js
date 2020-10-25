const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema({
  inMachine: {
    uid: {
      type: Number,
      default: null,
    },
  },
  profile: {
    name: String,
    cardId: {
      type: String,
      require: true,
    },
    email: String,
  },
});
module.exports = mongoose.model("Teacher", teacherSchema);
