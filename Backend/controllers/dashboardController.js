const User = require("../models/User");
const Mentor = require("../models/Mentor");
const CareerPath = require("../models/CareerPath");

const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalMentors, totalCareerPaths] = await Promise.all([
      User.countDocuments(),
      Mentor.countDocuments(),
      CareerPath.countDocuments(),
    ]);

    res.status(200).json({
      totalUsers,
      totalMentors,
      totalCareerPaths,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard stats",
      error: error.message,
    });
  }
};

module.exports = { getDashboardStats };