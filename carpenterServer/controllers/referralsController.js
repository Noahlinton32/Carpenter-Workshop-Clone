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

const updateReferral = async (req, res) =>{
    //get id
    const reportID = req.params.id;

    //get data off req body 
    const referralNumber = req.body.referralNumber;
    const studentID = req.body.studentID;
    const studentName = req.body.studentName;
    const date = req.body.date;
    const cause = req.body.cause;
    const action = req.body.action;
    const employeeID = req.body.employeeID;
    const parentPhoneNumber = req.body.parentPhoneNumber;

    //find and update
        await Referral.findOneAndUpdate({referralNumber: reportID}, {
            referralNumber: referralNumber,
            studentID: studentID,
            studentName: studentName,
            date: date,
            cause: cause, 
            action: action,
            employeeID: employeeID,
            parentPhoneNumber: parentPhoneNumber,
    });
    //find updated referral
    const referral = await Referral.findOne({referralNumber: reportID});
    //respond
    res.json({referral:referral})
};

//SETUP DELETE CONTROLLER AND ROUTE IN SERVER.JS
const deleteReferral = async (req,res) => {
    //find referral to delete

    //delete referral

    //respond with deleted referral

}

module.exports = {
    getAllReferrals: getAllReferrals,
    getOneReferral: getOneReferral,
    createReferral: createReferral,
    updateReferral: updateReferral,
    deleteReferral: deleteReferral
}