import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import reviewRouter from "./routes/reviewRouter.js";
import inquiryRouter from "./routes/inquiryRouter.js";

dotenv.config(); 

const app = express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
    let token = req.header("Authorization")

    if(token != null){
      token = token.replace("Bearer ","");
      console.log(token);

      jwt.verify(token, process.env.JWT_SECRET,
        (err,decoded) => {
          if(!err){
            req.user = decoded;
          }
        }
      );
    }
        next();
})

let mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl)

let connection = mongoose.connection

connection.once("open",()=>{
    console.log("MongoDB connection established successfully")
})

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/inquiries",inquiryRouter)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


//john.doe@example.com - securePassword123 - customer
//piyumal.doe@example.com - securePassword123 - admin