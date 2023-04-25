//loading env
if (process.env.NODE_ENV != 'production') {
    require("dotenv").config();
}; 

const mongoose = require('mongoose'); 

async function dbconnection() {
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log('Connected to DB');
    } catch (err){
        console.log(err);
    }
};

module.exports = dbconnection;