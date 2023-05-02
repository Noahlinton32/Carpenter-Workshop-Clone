const Referral = require('../models/referral');

const getAllReferrals = async (req, res)=> {
    //find all referrals
    const referrals = await Referral.find(); 

    //respond with referrals
    res.json({referrals:referrals});
};

const getOneReferral = async (req, res) => {
    //Get id from URL
    const reportID = req.params.id;

    //Find referral by ID (Report Num)
    const referral = await Referral.findOne({referralNumber: reportID});
    //respond with referral
    res.json({referral:referral});
};

const createReferral =  async (req, res) => {
    //Get data from req body
    const referralNumber = req.body.referralNumber;
    const studentID = req.body.studentID;
    const studentName = req.body.studentName;
    const date = req.body.date;
    const cause = req.body.cause;
    const action = req.body.action;
    const employeeID = req.body.employeeID;
    const parentPhoneNumber = req.body.parentPhoneNumber; 


    //Create Referral 
    const referral = await Referral.create({
        referralNumber: referralNumber,
        studentID: studentID,
        studentName: studentName,
        date: date,
        cause: cause, 
        action: action,
        employeeID: employeeID,
        parentPhoneNumber: parentPhoneNumber,
    });

    //respond with created referral
    res.json({referral: referral})
};
const updateReferral = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedReferral = await Referral.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.json({ referral: updatedReferral });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while updating the referral." });
    }
};

const getReferralById = async (req, res) => {
    try {
      const referral = await Referral.findById(req.params.id);
      if (!referral) {
        return res.status(404).json({ message: 'Referral not found' });
      }
      res.json({ referral });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
};

const deleteReferral = async (req, res) => {
    try {
      const referral = await Referral.findByIdAndDelete(req.params.id);
      if(!referral){
        res.status(404).json({ message: 'Referral not found' });
      }else{
        res.status(200).json({ message: "Referral successfully deleted" });
      }
    } catch (error) {
      res.status(500).json({ error: "An error occurred while deleting the referral." });
    }
};

module.exports = { updateReferral, getReferralById, deleteReferral };

module.exports = {
    getAllReferrals: getAllReferrals,
    getOneReferral: getOneReferral,
    createReferral: createReferral,
    updateReferral: updateReferral,
    getReferralById: getReferralById,
    deleteReferral: deleteReferral,


}