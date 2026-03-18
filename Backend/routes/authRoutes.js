const express = require("express");
const router = express.Router();
const { loginAdmin, registerAdmin } = require("../controllers/authController");

router.post("/login", loginAdmin);

module.exports = router;