//loading env
const path = require('path');
if (process.env.NODE_ENV != 'production') {
    require("dotenv").config();
}; 

//imports
const express = require('express');
const cors = require('cors');
const dbconnection = require('./config/dbconnection');
const frontendBuildPath = path.join(__dirname, '../carpenterFrontEnd/build');
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
  origin: ['https://carpenterservice.onrender.com', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.static(frontendBuildPath));
//Routes

// Staff Admin Controller 
app.get('/admin/staff', adminController.getAllStaff);
app.post('/admin/staff', adminController.createStaff);
app.put('/admin/staff/:employeeID', adminController.updateStaff);
app.delete('/admin/staff/:employeeID', adminController.archiveStaff);
app.put('/admin/staff/:employeeID/password', adminController.changeStaffPassword);
app.get('/admin/staff/exists/:employeeID', adminController.checkEmployeeIDExists);

// Student Admin Controller
app.get('/admin/students', adminController.getAllStudents);
app.post('/admin/students', adminController.createStudent);
app.put('/admin/students/:studentID', adminController.updateStudent);
app.delete('/admin/students/:studentID', adminController.archiveStudent);
//Login CFU

app.post('/login', loginController.checkCredentials);

//Student CFU
app.get('/students', studentsController.getAllStudents);
app.post("/students", studentsController.createStudent);
app.put('/students/:id', studentsController.updateStudent);
app.get('/students/:id', studentsController.getStudentById);

//Incidents CRUD
app.get('/incidents', incidentsController.getAllIncidents);
app.post("/incidents", incidentsController.createIncident);
app.put('/incidents/:id', incidentsController.updateIncident);
app.delete('/incidents/:id', incidentsController.deleteIncident);
app.get('/incidents/:id', incidentsController.getIncidentById);

//Accidents CRUD
app.get('/accidents', accidentsController.getAllAccidents);
app.post("/accidents", accidentsController.createAccident);
app.put('/accidents/:id', accidentsController.updateAccident);
app.delete('/accidents/:id', accidentsController.deleteAccident);
app.get('/accidents/:id', accidentsController.getAccidentById);

//Referrals CRUD
app.get('/referrals', referralsController.getAllReferrals);
app.post("/referrals", referralsController.createReferral);
app.put('/referrals/:id', referralsController.updateReferral);
app.delete('/referrals/:id', referralsController.deleteReferral);
app.get('/referrals/:id', referralsController.getReferralById);
// Catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});
//Server
app.listen(process.env.PORT , function (){
    console.log('Listening on port:'+process.env.PORT);
});