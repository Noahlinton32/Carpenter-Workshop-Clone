const Staff = require("../models/staff");

const checkCredentials = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Staff.findOne({ username });
    if (user && user.password === password) {
      const isAdmin = user.isAdmin;
      console.log("isAdmin value:", isAdmin);
      res.json({
        success: true,
        message: "Login successful",
        user: {
          username: user.username,
          isAdmin: user.isAdmin,
        },
      });
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