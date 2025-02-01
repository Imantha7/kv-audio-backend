import express from "express";
import { addReview, approveReview, deleteReview, getReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/",addReview)
reviewRouter.get("/",getReview)
reviewRouter.delete("/:email",deleteReview)
reviewRouter.put("/approve/:email",approveReview)

export default reviewRouter;