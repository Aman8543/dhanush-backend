const express = require("express");
const createProduct = require("../Controller/createProduct");
const productRout = express.Router();
const multer = require("multer");
const adminmidleware = require("../middleware/adminmiddleware");
const upload = multer({ dest: 'uploads/' });


productRout.post("/createProduct",upload.single('image'),adminmidleware,createProduct);

module.exports = productRout;