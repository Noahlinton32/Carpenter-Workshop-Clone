const Staff = require("../models/staff");

const checkCredentials = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Staff.findOne({ username });

    if (user && user.password === password) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.json({ success: false, message: "Login failed" });
    }
  } catch (error) {
    console.error("Error checking credentials:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
module.exports = { 
    checkCredentials: checkCredentials,
}