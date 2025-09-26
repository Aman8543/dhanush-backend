const express = require("express")
const makeadminrout = express.Router();
const {makeAdmin} = require("../Controller/allusersfetch");
const adminmidleware = require("../middleware/adminmiddleware");


makeadminrout.post("/makeadmin",adminmidleware,makeAdmin);

module.exports = makeadminrout;