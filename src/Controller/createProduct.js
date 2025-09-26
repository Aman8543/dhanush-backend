
const cloudinary = require("cloudinary").v2
const fs = require('fs');
const Category = require("../schema/category"); 


const createProduct =async(req,res)=>{

   try{

    const image= req.file.path;

    

    const {name,category,description,basePrice} = req.body;
      

      const foundCategory = await Category.findOne({name:category});
      
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
    
    
      
        

             
    

                    
        

            foundCategory.products.push({
            name: name,   // match schema's field name
            image: uploadResult.secure_url,
            basePrice: basePrice,    // match schema's field name
            description: description
           });
                        const res=await foundCategory.save();
                       
             
                        res.send("successfully created product");
                    }
                    catch(err){
                        res.send("product not created");
                    }
                 


    
                 
}

module.exports = createProduct;