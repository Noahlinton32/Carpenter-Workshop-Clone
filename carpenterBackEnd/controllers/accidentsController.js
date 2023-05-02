const Accident = require('../models/accident');

const getAllAccidents = async (req, res)=> {
    //find all accidents
    const accidents = await Accident.find(); 

    //respond with accidents
    res.json({accidents:accidents});
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

const updateAccident = async (req, res) => {
  try{
  const { id } = req.params;
  const updatedAccident = await Accident.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json({ accident: updatedAccident });
}catch(error){
  res.status(500).json({ error: "An error occurred while updating the incident." });
  }
  
};

const getAccidentById = async (req, res) => {
  try {
    const accident = await Accident.findById(req.params.id);
    if (!accident) {
      return res.status(404).json({ message: 'Accident not found' });
    }
    res.json({ accident });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteAccident = async (req, res) => {
  try {
    const accident = await Accident.findByIdAndDelete(req.params.id);
    if (!accident) {
      res.status(404).json({ message: 'Accident not found' });
    } else {
      res.status(200).json({ message: 'Accident deleted successfully', accident: accident });
    }
  } catch (error) {
    console.error('Error deleting accident:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
    getAllAccidents: getAllAccidents,
    createAccident: createAccident,
    updateAccident: updateAccident,
    deleteAccident: deleteAccident,
    getAccidentById:getAccidentById,
}