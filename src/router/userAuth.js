const { userRegister, login, logout, deleteprofile ,check} = require("../Controller/userAuth");

const express = require('express');
const usermidleware = require("../middleware/usermiddleware");
const authRouter = express.Router();

authRouter.post("/userregister",userRegister);
authRouter.post("/login",login);
authRouter.post("/logout",usermidleware,logout);
authRouter.delete("/delete",usermidleware,deleteprofile);
authRouter.delete("/check",usermidleware,check);
module.exports = authRouter;

