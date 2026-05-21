const students = require("../models/studentModel");

/* GET ALL STUDENTS */

const getStudents = (req, res) => {

  res.json(students);
};

/* ADD STUDENT */

const addStudent = (req, res) => {

  const newStudent = {

    id: Date.now(),

    name: req.body.name,

    age: req.body.age,

    course: req.body.course
  };

  students.push(newStudent);

  res.json({

    message: "Student Added Successfully",

    student: newStudent
  });
};

/* UPDATE STUDENT */

const updateStudent = (req, res) => {

  const id = Number(req.params.id);

  const student = students.find(
    (s) => s.id === id
  );

  if(student){

    student.name = req.body.name;

    student.age = req.body.age;

    student.course = req.body.course;

    res.json({

      message: "Student Updated Successfully"
    });
  }

  else{

    res.json({

      message: "Student Not Found"
    });
  }
};

/* DELETE STUDENT */

const deleteStudent = (req, res) => {

  const id = Number(req.params.id);

  const index = students.findIndex(
    (s) => s.id === id
  );

  if(index !== -1){

    students.splice(index, 1);

    res.json({

      message: "Student Deleted Successfully"
    });
  }

  else{

    res.json({

      message: "Student Not Found"
    });
  }
};

module.exports = {

  getStudents,

  addStudent,

  updateStudent,

  deleteStudent
};