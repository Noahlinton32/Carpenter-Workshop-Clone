const mongoose = require('mongoose');
const {Schema} = mongoose;

const incidentSchema = new Schema({ //Schema describes the attributes
    incidentReportNumber: Number,
    studentID: Number,
    agencyOrProgram: String,
    contactNumber: String,
    address: String,
    incidentType: String, 
    incidentTypeOther: String,
    location: String, 
    date: Date, 
    employeeID: Number, 
    firstNameParticipant: String, 
    lastNameParticipant: String,  
    firstNameReport: String, 
    lastNameReport: String,
    contactReportNumber: String, 
    contactReportEmail: String, 
    firstNameManager: String, 
    lastNameManager: String, 
    phoneNumberManager: String, 
    emailAddressManager: String, 
    signed: String
});

const Incident = mongoose.model('Incident', incidentSchema); //Name of collection, Schema 
module.exports = Incident;