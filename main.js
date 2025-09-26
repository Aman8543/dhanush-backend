const express = require("express");
const database = require("./src/database/mongodb");
const app = express();
const cookieParser = require("cookie-parser");
//routing
const CategoryRout = require("./src/router/Category");
const productRout = require("./src/router/product");
const dataRout = require("./src/router/getData");
const cors = require("cors");
const redisClient = require("./src/database/redisClient");
const authRouter = require("./src/router/userAuth");
const makeadminrout= require("./src/router/admincreter");

app.use(cors({
  origin:["https://dhanush-shop.vercel.app",'http://localhost:5173'], // or '*' to allow all
  credentials: true // if you need cookies or auth headers
}));



app.use(express.json());
app.use(cookieParser());


app.use("/category",CategoryRout);
app.use("/product",productRout);
app.use("/fetchdata",dataRout);
app.use("/auth",authRouter);
app.use("/admin",makeadminrout);




const initialization=async()=>{

    
    
    try{
        await Promise.all([database(),redisClient.connect()]);
        console.log("data base connected");
        app.listen(2500,(req,res)=>{
            console.log("i am listening at port no 2500");
        })

    }
    catch(err){
        console.log("database not connected "+err);
    }
}

initialization();