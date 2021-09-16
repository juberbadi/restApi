const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const { check, validationResult } = require("express-validator");

router.get("/students", function (req, res, next) {
  Student.find({})
    .then(function (students) {
      res.send(students);
    })
    .catch(next);
});

// router.post(
//   "/students",

//   function (req, res, next) {
//     Student.create(req.body)
//       .then(function (student) {
//         res.send(student);
//       })
//       .catch(next);
//   }
// );

router.post("/students", [], async (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  try {
    const userExist = await Student.findOne({ email: email });
    if (userExist) {
      return res
        .status(422)
        .json({ error: "Email is already exists, Enter different email" });
    } else {
      const user = new Student({ email });
      await user.save();
      res.status(200).json({ message: "Data Submitted" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/students/:id", function (req, res, next) {
  Student.findOneAndUpdate({ _id: req.params.id }, req.body).then(function (
    student
  ) {
    Student.findOne({ _id: req.params.id }).then(function (student) {
      res.send(student);
    });
  });
});

router.delete("/students/:id", function (req, res, next) {
  Student.findOneAndDelete({ _id: req.params.id }).then(function (student) {
    res.send(student);
  });
});

module.exports = router;
