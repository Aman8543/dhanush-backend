const User = require("../schema/userSchema");


const fetchalluser =async(req,res)=>{
    try{
        const alluser =await User.find({});
        res.json({alluser});
    }
    catch(err){
        res.json("something is wrong " + err);
    }
}

const makeAdmin = async(req,res)=>{
    console.log(req);

    try{
        const user = await User.findOne({phone:req.body.phone});
       
        user.role = "admin";
        await user.save();
        
        res.json({message:"successfully created"});
        
    }
    catch(err){
        res.json({error:err});
    }

}

module.exports = {fetchalluser,makeAdmin};