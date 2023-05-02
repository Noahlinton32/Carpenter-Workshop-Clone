const mongoose = require('mongoose');
const {Schema} = mongoose;

const accidentSchema = new Schema({ //Schema describes the user attributes
    accidentReportNumber: Number,
    studentID: Number,
    school: String,
    employeeID: Number,
    room: String,
    date: Date,
    location: String, 
    employeeIDInvolved: Number,
    studentIDInvolved: Number,
    cause: String,
    response: String,
    preventativeAction: String, 
    witnesses: String,
    signed: String 
});

const Accident = mongoose.model('Accident', accidentSchema); //Name of collection, Schema 
module.exports = Accident;