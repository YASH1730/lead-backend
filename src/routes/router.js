const express = require("express");
const { register, login } = require("../controller/user");
const { saveLead, getAllLeads } = require("../controller/leads");
const router = express.Router();

// users
router.post("/user/register", register);
router.post("/user/login", login);

// leads
router.post("/lead/saveLead", saveLead);
router.get("/lead/getAllLeads", getAllLeads);

module.exports = router;
