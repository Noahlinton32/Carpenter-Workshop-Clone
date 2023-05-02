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

const checkEmployeeIDExists = async (req, res) => {
  try {
    const staffId = req.params.employeeID;
    if (isNaN(staffId)) {
      res.status(404).json({ message: 'Invalid employee ID' });
      return;
    }
    const staff = await Staff.findOne({ employeeID: staffId });
    if (!staff) {
      res.status(404).json({ message: 'Staff not found' });
    } else {
      res.json({ staff: staff });
    }
  } catch (error) {
    console.error('Error checking staff ID existence:', error);
    res.status(500).json({ error: 'An error occurred while checking staff ID existence.' });
  }
};
const updateStaff = async (req, res) => {
  try {
    const employeeID = req.params.employeeID;

    if (isNaN(employeeID)) {
      res.status(400).json({ message: 'Invalid employee ID' });
      return;
    }

    const staff = await Staff.findOneAndUpdate({ employeeID: employeeID }, req.body, { new: true });

    if (!staff) {
      res.status(404).json({ message: 'Staff not found' });
      return;
    }

    res.json({ staff: staff });
  } catch (error) {
    res.status(500).json({ message: 'Error editing staff' });
  }
};

const changeStaffPassword = async (req, res) => {
  const employeeID = req.params.employeeID;
  const newPassword = req.body.password;

  if (isNaN(employeeID)) {
    res.status(400).json({ message: 'Invalid employee ID' });
    return;
  }

  const staff = await Staff.findOneAndUpdate({ employeeID: employeeID }, { password: newPassword }, { new: true });

  if (!staff) {
    res.status(404).json({ message: 'Staff not found' });
    return;
  }

  res.json({ staff: staff });
};

const archiveStaff = async (req, res) => {
  const staffId = req.params.employeeID;
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
  const studentId = req.params.studentID;
  const student = await Student.findByIdAndUpdate(studentId, req.body, {
    new: true,
  });
  res.json({ student: student });
};


const archiveStudent = async (req, res) => {
    const studentId = req.params.studentID;
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
  changeStaffPassword: changeStaffPassword,
  checkEmployeeIDExists: checkEmployeeIDExists
};