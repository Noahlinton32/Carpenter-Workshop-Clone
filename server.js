//loading env
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
const loginController = require('./controllers/loginController');
const adminController = require('./controllers/adminController');
//App
const app = express();

//connect to MONGODB
dbconnection();

//Configure express app
app.use(express.json()); 
app.use(cors({
    origin: 'http://localhost:3001', // Replace this with your frontend domain
  }));

//Routes


// Staff Admin Controller 
app.get('/admin/staff', adminController.getAllStaff);
app.post('/admin/staff', adminController.createStaff);
app.put('/admin/staff/:employeeID', adminController.updateStaff);
app.delete('/admin/staff/:employeeID', adminController.archiveStaff);
app.put('/admin/staff/:employeeID/password', adminController.changeStaffPassword);

// Student Admin Controller
app.get('/admin/students', adminController.getAllStudents);
app.post('/admin/students', adminController.createStudent);
app.put('/admin/students/:employeeID', adminController.updateStudent);
app.delete('/admin/students/:employeeID', adminController.archiveStudent);
//Login CFU

app.post('/login', loginController.checkCredentials);

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
//ADD DELETE REQUEST ROUTE HERE AND CONTROLLER IN INCIDENTSCONTROLLER.JS
app.delete('/incidents/:id', incidentsController.deleteIncident);

//Accidents CRUD
app.get('/accidents', accidentsController.getAllAccidents);
app.get('/accidents/:id', accidentsController.getOneAccident );
app.post("/accidents", accidentsController.createAccident);
app.put('/accidents/:id', accidentsController.updateAccident);
//ADD DELETE REQUEST ROUTE HERE AND CONTROLLER IN ACCIDENTSCONTROLLER.JS
app.delete('/accidents/:id', accidentsController.deleteAccident);

//Referrals CRUD
app.get('/referrals', referralsController.getAllReferrals);
app.get('/referrals/:id', referralsController.getOneReferral );
app.post("/referrals", referralsController.createReferral);
app.put('/referrals/:id', referralsController.updateReferral);
//ADD DELETE REQUEST ROUTE HERE AND CONTROLLER IN ReferralsCONTROLLER.JS
app.delete('/referrals/:id', referralsController.deleteReferral);

//Server
app.listen(process.env.PORT , function (){
    console.log('Listening on port:'+process.env.PORT);
});