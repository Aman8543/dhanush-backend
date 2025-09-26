const Category = require("../schema/category");
const cloudinary = require("cloudinary").v2
const fs = require('fs');

    


const createCotagory =async (req,res)=>{
    
   
     const {name,description}= req.body;
    // console.log(img)

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key:process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET_KEY 
    });

    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           req.file.path, {
               use_filename: true
           }
       )
       .catch((error) => {
           console.log(error);
       });
        fs.unlinkSync(req.file.path);
    try{
        await Category.create({
            name:name,
            description:description,
            img:uploadResult.secure_url

        })

        res.send("successfully created category");
    }
    catch(err){
        res.send("not created" + err);
    }
}

module.exports = createCotagory;