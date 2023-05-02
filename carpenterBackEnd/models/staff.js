const mongoose = require('mongoose');
const {Schema} = mongoose;

const staffSchema = new Schema({ //Schema describes the user attributes
    employeeID: Number, 
    password: String,
    name: String, 
    username: String, 
    email: String, 
    isAdmin: Number,
    isActive: Number,
    userAvatar: String
});

const Staff = mongoose.model('Staff', staffSchema); //Name of collection, Schema 
module.exports = Staff;