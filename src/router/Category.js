const express = require("express");
const CategoryRout = express.Router();
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });

const createCotagory = require("../Controller/createCategory");
const adminmidleware = require("../middleware/adminmiddleware");

CategoryRout.post("/createCategory", upload.single('img'),adminmidleware,createCotagory);

module.exports = CategoryRout ;