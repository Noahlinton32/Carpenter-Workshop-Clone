const Student = require('../models/student');

const getAllStudents = async (req, res)=> {
    //find students
    const students = await Student.find(); 

    //respond with students
    res.json({students:students});
};

const createStudent =  async (req, res) => {
    //Get data from req body
    const studentID = req.body.studentID;
    const name = req.body.name;
    const address = req.body.address;
    const gpa = req.body.gpa;
    const grade = req.body.grade;
    const firstNameFirstGuardian = req.body.firstNameFirstGuardian;
    const lastNameFirstGuardian = req.body.lastNameFirstGuardian;
    const firstNameSecondGuardian = req.body.firstNameSecondGuardian;
    const lastNameSecondGuardian = req.body.lastNameSecondGuardian;
    const emergencyNumber = req.body.emergencyNumber;
    const enrollmentDate = req.body.enrollmentDate;
    const graduationDate = req.body.graduationDate;
    const isActive = req.body.isActive;
    //Create Student
    const student = await Student.create({
        studentID: studentID,
        name: name,
        address: address,
        gpa: gpa,
        grade: grade,
        firstNameFirstGuardian: firstNameFirstGuardian, 
        lastNameFirstGuardian: lastNameFirstGuardian, 
        firstNameSecondGuardian: firstNameSecondGuardian,
        lastNameSecondGuardian: lastNameSecondGuardian,
        emergencyNumber: emergencyNumber,
        enrollmentDate: enrollmentDate,
        graduationDate: graduationDate,
        isActive: isActive,
    });

    //respond with created Student
    res.json({student: student})
};

const updateStudent = async (req, res) => {
  const id = req.params.id;
  const updatedStudent = req.body;

  try {
      const result = await Student.findByIdAndUpdate(id, updatedStudent, { new: true });
      res.status(200).json({ student: result });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getStudentById = async (req, res) => {
  const id = req.params.id;

  try {
      const student = await Student.findById(id);
      if (!student) {
          res.status(404).json({ message: 'Student not found' });
      } else {
          res.status(200).json({ student });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getAllStudents: getAllStudents,
    createStudent: createStudent,
    updateStudent: updateStudent,
    getStudentById: getStudentById,
}
