const mongoose = require("mongoose");

const backLogSchema = new mongoose.Schema({
  teacherId: {
    type:String,
    ref:'Teacher'
  },
  history:[{
    date: Number,
    enrolledTime:[
      {
        time:Number
      }
    ],
    description:String,
  }]
});
module.exports = mongoose.model("Backlog", backLogSchema);
