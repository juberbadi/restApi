const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create student schema & model
const StudentSchema = new Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  present: {
    type: Boolean,
    deafult: true,
  },
});

const Student = mongoose.model("student", StudentSchema);

module.exports = Student;
