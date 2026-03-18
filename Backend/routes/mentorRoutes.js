const express = require("express");
const router = express.Router();

const {
  getMentors,
  createMentor,
  updateMentor,
  deleteMentor,
} = require("../controllers/mentorController");

router.get("/", getMentors);
router.post("/", createMentor);
router.put("/:id", updateMentor);
router.delete("/:id", deleteMentor);

module.exports = router;