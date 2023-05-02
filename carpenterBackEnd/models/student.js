const mongoose = require('mongoose');
const {Schema} = mongoose;

const studentSchema = new Schema({ //Schema describes the user attributes
    studentID: Number,
    name: String,
    address: String,
    gpa: Number, 
    grade: String,
    firstNameFirstGuardian: String,
    lastNameFirstGuardian: String,    
    firstNameSecondGuardian: String,
    lastNameSecondGuardian: String,
    emergencyNumber: Number,   
    enrollmentDate: Date,
    graduationDate: Date,
    isActive: Number
});

const Student = mongoose.model('Student', studentSchema); //Name of collection, Schema 
module.exports = Student;