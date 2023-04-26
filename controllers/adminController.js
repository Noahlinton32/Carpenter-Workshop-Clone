const Student = require("../models/student");
const Staff = require("../models/staff");

// Staff functions
const getAllStaff = async (req, res) => {
  const staff = await Staff.find();
  res.json({ staff: staff });
};

const createStaff = async (req, res) => {
  const staff = await Staff.create(req.body);
  res.json({ staff: staff });
};

const updateStaff = async (req, res) => {
  const staffId = req.params.id;
  const staff = await Staff.findByIdAndUpdate(staffId, req.body, { new: true });
  res.json({ staff: staff });
};

const archiveStaff = async (req, res) => {
  const staffId = req.params.id;
  const staff = await Staff.findById(staffId);

  staff.isActive = !staff.isActive;
  await staff.save();

  res.json({ staff: staff });
};

// Student functions
const getAllStudents = async (req, res) => {
  const students = await Student.find();
  res.json({ students: students });
};

const createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.json({ student: student });
};

const updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const student = await Student.findByIdAndUpdate(studentId, req.body, {
    new: true,
  });
  res.json({ student: student });
};


const archiveStudent = async (req, res) => {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
  
    student.isActive = !student.isActive;
    await student.save();
  
    res.json({ student: student });
  };

module.exports = {
  getAllStaff: getAllStaff,
  createStaff: createStaff,
  updateStaff: updateStaff,
  archiveStaff: archiveStaff,
  getAllStudents: getAllStudents,
  createStudent: createStudent,
  updateStudent: updateStudent,
  archiveStudent: archiveStudent,
};