const Accident = require('../models/accident');

const getAllAccidents = async (req, res)=> {
    //find all accidents
    const accidents = await Accident.find(); 

    //respond with accidents
    res.json({accidents:accidents});
};

const getOneAccident = async (req, res) => {
    //Get id from URL
    const reportID = req.params.id;
    //Find accident by ID (Report Num)
    const accident = await Accident.findOne({accidentReportNumber: reportID});
    //respond with accident
    res.json({accident:accident});
};

const createAccident =  async (req, res) => {
    //Get data from req body
    const accidentReportNumber = req.body.accidentReportNumber;
    const studentID = req.body.studentID;
    const school = req.body.school;
    const employeeID = req.body.employeeID;
    const room = req.body.room;
    const date = req.body.date;
    const location = req.body.location;
    const employeeIDInvolved = req.body.employeeIDInvolved;
    const studentIDInvolved = req.body.studentIDInvolved;
    const cause = req.body.cause;
    const response = req.body.response;
    const preventativeAction = req.body.preventativeAction;
    const witnesses = req.body.witnesses;
    const signed = req.body.signed;

    //Create Accident 
    const accident = await Accident.create({
        accidentReportNumber: accidentReportNumber,
        studentID: studentID,
        school: school,
        employeeID: employeeID,       
        room: room,
        date: date, 
        location: location,
        employeeIDInvolved: employeeIDInvolved,
        studentIDInvolved: studentIDInvolved,
        cause: cause,
        response: response,
        preventativeAction: preventativeAction,
        witnesses: witnesses,
        signed: signed,

    });

    //respond with created accident
    res.json({accident: accident})
};

const updateAccident = async (req, res) =>{
    //get id
    const reportID = req.params.id;

    //get data off req body 
    const accidentReportNumber = req.body.accidentReportNumber;
    const studentID = req.body.studentID;
    const school = req.body.school;
    const employeeID = req.body.employeeID;
    const room = req.body.room;
    const date = req.body.date;
    const location = req.body.location;
    const employeeIDInvolved = req.body.employeeIDInvolved;
    const studentIDInvolved = req.body.studentIDInvolved;
    const cause = req.body.cause;
    const response = req.body.response;
    const preventativeAction = req.body.preventativeAction;
    const witnesses = req.body.witnesses;
    const signed = req.body.signed;

    //find and update
        await Accident.findOneAndUpdate({accidentReportNumber: reportID}, {
            accidentReportNumber: accidentReportNumber,
            studentID: studentID,
            school: school,
            employeeID: employeeID,       
            room: room,
            date: date, 
            location: location,
            employeeIDInvolved: employeeIDInvolved,
            studentIDInvolved: studentIDInvolved,
            cause: cause,
            response: response,
            preventativeAction: preventativeAction,
            witnesses: witnesses,
            signed: signed,
    });
    //find updated accident
    const accident = await Accident.findOne({accidentReportNumber: reportID});
    //respond
    res.json({accident:accident})
};

//SETUP DELETE CONTROLLER AND ROUTE IN SERVER.JS
const deleteAccident = async (req,res) => {
    //find accident to delete

    //delete accident

    //respond with deleted accident

}

module.exports = {
    getAllAccidents: getAllAccidents,
    getOneAccident: getOneAccident,
    createAccident: createAccident,
    updateAccident: updateAccident,
    deleteAccident: deleteAccident
}