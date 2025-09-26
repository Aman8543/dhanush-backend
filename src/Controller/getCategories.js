const category = require("../schema/category");

const getCategories = async(req,res)=>{


    try{

        const categorydata = await category.find({});
        if(!categorydata){
            res.send("data is not found ");
        }
        res.json(
            categorydata
        )

    }
    catch(err){
        res.send("data is not found" + err);
    }
}

module.exports = getCategories;