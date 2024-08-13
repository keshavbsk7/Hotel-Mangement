const Admin = require('../models/adminModels');

const adminSignup = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`Received request with user: ${username}, pass: ${password}`);

    // Create a new admin instance
    const newAdmin = new Admin({
      username:req.body.username,
      password:req.body.password
    });

    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully', success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin by username
    const admin = await Admin.findOne({ username });

    // If admin not found
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found', success: false });
    }

    // If passwords match, allow login
    if (admin.password==password) {
      return res.status(200).json({ message: 'Admin login successful', success: true });
    } else {
      return res.status(401).json({ message: 'Invalid credentials', success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

module.exports = {
  adminSignup,
  adminLogin
};
