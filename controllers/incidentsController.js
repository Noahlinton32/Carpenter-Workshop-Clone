const Incident = require('../models/incident');

const getAllIncidents = async (req, res)=> {
    //find all incidents
    const incidents = await Incident.find(); 

    //respond with incidents
    res.json({incidents:incidents});
};

const getOneIncident = async (req, res) => {
    //Get id from URL // 
    const reportID = req.params.id;

    //Find incident by ID (Report Num)
    const incident = await Incident.findOne({incidentReportNumber: reportID});
    //respond with incident // returns all data contained within that entry
    res.json({incident:incident});
};

const createIncident =  async (req, res) => {
    //Get data from req body
    const incidentReportNumber = req.body.incidentReportNumber;
    const studentID = req.body.studentID;
    const agencyOrProgram = req.body.agencyOrProgram;
    const contactNumber = req.body.contactNumber;
    const address = req.body.address;
    const incidentType = req.body.incidentType;
    const incidentTypeOther = req.body.incidentTypeOther;
    const location = req.body.location;
    const date = req.body.date;
    const employeeID = req.body.employeeID;
    const firstNameParticipant = req.body.firstNameParticipant;
    const lastNameParticipant = req.body.lastNameParticipant;
    const firstNameReport = req.body.firstNameReport;
    const lastNameReport = req.body.lastNameReport;
    const contactReportNumber = req.body.contactReportNumber;
    const contactReportEmail = req.body.contactReportEmail;
    const firstNameManager = req.body.firstNameManager;
    const lastNameManager = req.body.lastNameManager;
    const phoneNumberManager = req.body.phoneNumberManager;
    const emailAddressManager = req.body.emailAddressManager;
    const signed = req.body.signed;

    //Create Incident 
    const incident = await Incident.create({
        incidentReportNumber: incidentReportNumber,
        studentID: studentID,
        agencyOrProgram: agencyOrProgram,
        contactNumber: contactNumber, 
        address: address,
        incidentType: incidentType, 
        incidentTypeOther: incidentTypeOther,
        location: location,
        date: date, 
        employeeID: employeeID,       
        firstNameParticipant: firstNameParticipant,
        lastNameParticipant: lastNameParticipant, 
        firstNameReport: firstNameReport, 
        lastNameReport: lastNameReport,
        contactReportNumber: contactReportNumber, 
        contactReportEmail: contactReportEmail, 
        firstNameManager: firstNameManager, 
        lastNameManager: lastNameManager, 
        phoneNumberManager: phoneNumberManager,
        emailAddressManager: emailAddressManager,
        signed: signed,

    });

    //respond with created incident
    res.json({incident: incident})
};

const updateIncident = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedIncident = await Incident.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.json({ incident: updatedIncident });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while updating the incident." });
    }
  };
  const getIncidentById = async (req, res) => {
    try {
      const incident = await Incident.findById(req.params.id);
      if (!incident) {
        return res.status(404).json({ message: 'Incident not found' });
      }
      res.json({ incident });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  const deleteIncident = async (req, res) => {
    try {
      const incident = await Incident.findByIdAndDelete(req.params.id);
      if(!incident){
        res.status(404).json({ message: 'incident not found' });
      }else{}
      res.status(200).json({ message: "Incident successfully deleted" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while deleting the incident." });
    }
  };
  

module.exports = {
    getAllIncidents: getAllIncidents,
    getOneIncident: getOneIncident,
    createIncident: createIncident,
    updateIncident: updateIncident,
    getIncidentById:getIncidentById,
    deleteIncident: deleteIncident
}