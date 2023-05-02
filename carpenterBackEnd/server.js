//loading env
const path = require('path');
if (process.env.NODE_ENV != 'production') {
    require("dotenv").config();
}; 

//imports
const express = require('express');
const cors = require('cors');
const dbconnection = require('./config/dbconnection');

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
// Catch-all route
app.use(express.static(path.join(__dirname, '../carpenterFrontEnd/build')));
//Server
app.listen(process.env.PORT , function (){
    console.log('Listening on port:'+process.env.PORT);
});