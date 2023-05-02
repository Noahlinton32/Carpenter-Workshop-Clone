//loading env
if (process.env.NODE_ENV != 'production') {
    require("dotenv").config();
}; 

//imports
const express = require('express');
const cors = require('cors');
const dbconnection = require('./config/dbconnection');
const path = require('path');
const fs = require('fs');
const studentsController = require('./controllers/studentsController');
const incidentsController = require('./controllers/incidentsController');
const accidentsController = require('./controllers/accidentsController');
const referralsController = require('./controllers/referralsController');

//App
const app = express();

//connect to MONGODB
dbconnection();

//Configure express app
app.use(express.json()); 
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

//Routes

//Student CFU
app.get('/students', studentsController.getAllStudents);
app.get('/students/:id', studentsController.getOneStudent );
app.post("/students", studentsController.createStudent);
app.put('/students/:id', studentsController.updateStudent);

//Incidents CRUD
app.get('/incidents', incidentsController.getAllIncidents);
app.get('/incidents/:id', incidentsController.getOneIncident );
app.post("/incidents", incidentsController.createIncident);
app.put('/incidents/:id', incidentsController.updateIncident);
app.delete('/incidents/:id', incidentsController.deleteIncident);

//Accidents CRUD
app.get('/accidents', accidentsController.getAllAccidents);
app.get('/accidents/:id', accidentsController.getOneAccident );
app.post("/accidents", accidentsController.createAccident);
app.put('/accidents/:id', accidentsController.updateAccident);
app.delete('/accidents/:id', accidentsController.deleteAccident);

//Referrals CRUD
app.get('/referrals', referralsController.getAllReferrals);
app.get('/referrals/:id', referralsController.getOneReferral );
app.post("/referrals", referralsController.createReferral);
app.put('/referrals/:id', referralsController.updateReferral);
app.delete('/referrals/:id', referralsController.deleteReferral);
console.log("__dirname:", __dirname);
console.log("Contents of build directory:", fs.readdirSync(path.join(__dirname, "../carpenterFrontEnd/build")));
// Catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
//Server
app.listen(process.env.PORT , function (){
    console.log('Listening on port:'+process.env.PORT);
});