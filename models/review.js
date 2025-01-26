import mongoose from "mongoose";
import { trusted } from "mongoose";

const reviewSchema = new mongoose.Schema({
    email : {
        type : String,
        required :true,
        unique : true
    },
    name : {
        type : String,
        required :true
    },
    comment : {
        type : date,
        required :true
    },
    date : {
        type : String,
        required :true,
        default : Date.now()
    },
    isApproved :{
        type : Boolean,
        required : true,
        default : false
    }
    
})

const Review = mongoose.model("Review",removeEventListener);

export default Review;