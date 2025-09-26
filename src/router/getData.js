const express = require("express");
const getCategories = require("../Controller/getCategories");
const {fetchalluser,makeadmin} = require("../Controller/allusersfetch");
// const getproducts = require("../Controller/getProduct");
const dataRout = express.Router();


dataRout.get("/categoriesData",getCategories);
dataRout.get("/allUserdata",fetchalluser);

// dataRout.get("/productData",getproducts);

module.exports = dataRout;