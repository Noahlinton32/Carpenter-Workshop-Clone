const Student = require('../models/student');

const getAllStudents = async (req, res)=> {
    //find students
    const students = await Student.find(); 

    //respond with students
    res.json({students:students});
};

const getOneStudent = async (req, res) => {
    //Get id from URL
    const studID = req.params.id;

    //Find student by ID
    const student = await Student.findOne({studentID: studID});
    //respond with student
    res.json({student:student});
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
    try {
        const { id } = req.params;
        const updatedStudents = await Student.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.json({ incident: updatedStudents});
    } catch (error) {
      res.status(500).json({ error: "An error occurred while updating the incident." });
    }
  };
  const getStudentById = async (req, res) => {
    try {
      const Students = await Student.findById(req.params.id);
      if (!Students) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.json({ incident });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {
    getAllStudents: getAllStudents,
    getOneStudent: getOneStudent,
    createStudent: createStudent,
    updateStudent: updateStudent,
    getStudentById: getStudentById,
}
