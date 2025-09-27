const uservalidator = require("../validator.js/uservalidator");
const User = require("../schema/userSchema");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const redisClient = require("../database/redisClient");
const userRegister = async(req,res)=>{

    try{
        const {name,password,phone,address}=req.body;
    
        uservalidator(req.body);
      
        req.body.password = await bcrypt.hash(password,10);
        
        const user = await User.create(req.body);
       
        const token = jwt.sign({_id:user._id,name:name}, process.env.JWT_KEY,{expiresIn: 60*60*24*365});
        res.cookie("token",token,{maxAge:1000 * 60 * 60 * 24 * 365,sameSite: 'None',secure: true});

        
        res.json({
            user:{
                role:"retailer",
                name:name,
                phone:phone,
                _id:user._id,
            },
            
            message:"successfuly register"
        })
    }
    catch(err){
        res.json({
            err:"something is wrong try again and check all fields "+err
        })
    }
    


}

const login = async (req,res)=>{
      try{
        
        const {phone, password} = req.body;

        if(!phone)
            throw new Error("Invalid Credentials");
        if(!password)
            throw new Error("Invalid Credentials");

        const user = await User.findOne({phone});
        
        let match;
        if(user){
             match =await bcrypt.compare(password,user.password);
        }
        

        const reply={
            role:user.role,
            name:user.name,
            phone:phone,
            _id:user._id
        }

        if(!match)
            throw new Error("Invalid Credentials");

        const token =  jwt.sign({_id:user._id , phone:phone},process.env.JWT_KEY,{expiresIn: 60*60*365});
       
        res.cookie('token',token,{maxAge: 60*60*1000*365,sameSite: 'None',secure: true,});
        res.status(200).json({
            user:reply,
            message:"User login Successfully"
        });
       
    }
    catch(err){
       
        res.status(401).json({
            Error:"In valid credentials"
        });
    }
}


// logOut feature

const logout = async(req,res)=>{
   
    try{
        const {token} = req.cookies;
        const payload = jwt.decode(token);

       
        const x= await redisClient.set(`token:${token}`,'Blocked');
       
        const y=await redisClient.expireAt(`token:${token}`,payload.exp);
        
    //    Token add kar dung Redis ke blockList
    //    Cookies ko clear kar dena.....
    
    res.cookie("token",null,{expires: new Date(Date.now())});
    
    res.send("Logged Out Succesfully");

    }
    catch(err){
        console.log(err);
       res.status(503).json("Error: "+err);
    }
}

const check = (req,res)=>{
    
    const reply = {
        name: req.result.name,
        phone:req.result.phone,
        role:req.result.role,
        _id:req.result._id
    }

    res.status(200).json({
        user:reply,
        message:"Valid User"
    });
}

// const adminregister = async (req,res)=>{
    
//     try{
//       // validate the data;
//     //   console.log(req.result.role);
//       if(req.result.role != "admin"){
//         throw new Error("you are not admin");
//       }
//       validate(req.body); 
//       const {firstName, emailId, password}  = req.body;
//       req.body.password = await bcrypt.hash(password, 10);
     
//     //
    
//      const user =  await User.create(req.body);
//      const token =  jwt.sign({_id:user._id , emailId:emailId,role:user.role},process.env.JWT_KEY,{expiresIn: 60*60});
//      res.cookie('token',token,{maxAge: 60*60*1000});
//      res.status(201).send("User Registered Successfully");
//      console.log("2")
//     }
//     catch(err){
//         res.status(400).send("Error: "+err);
//     }
// }

const deleteprofile = async (req,res)=>{
    try{
        const userId= req.result._id;
        if(!userId){
            res.send("user is not exist");
        }
       await User.findByIdAndDelete(userId);

        //await Submission.deleteMany({userId});

        res.send("successfully deleted");
    }
    catch(err){
        res.send("error"+ err);
    }
}


module.exports = {userRegister,login,logout,deleteprofile,check};