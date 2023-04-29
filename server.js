//loading env
if (process.env.NODE_ENV != 'production') {
    require("dotenv").config();
}; 

//imports
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
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
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true, parameterLimit: 5000000 }));
app.use(express.json()); 
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3001', // Replace this with your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add the allowed methods
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

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
app.get('/students/:id', studentsController.getOneStudent );
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
//Server
app.listen(process.env.PORT , function (){
    console.log('Listening on port:'+process.env.PORT);
});