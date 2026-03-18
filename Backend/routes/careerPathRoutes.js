const express = require("express");
const router = express.Router();

const {
  getCareerPaths,
  createCareerPath,
  updateCareerPath,
  deleteCareerPath,
} = require("../controllers/careerPathController");

router.get("/", getCareerPaths);
router.post("/", createCareerPath);
router.put("/:id", updateCareerPath);
router.delete("/:id", deleteCareerPath);

module.exports = router;