const mongoose = require('mongoose');
const {Schema} = mongoose;

const referralSchema = new Schema({ //Schema describes the user attributes
    referralNumber: Number,
    studentID: Number,
    studentName: String,
    date: Date,
    cause: String, 
    action: String,
    employeeID: Number, 
    parentPhoneNumber: String   
});

const Referral = mongoose.model('Referral', referralSchema); //Name of collection, Schema 
module.exports = Referral;