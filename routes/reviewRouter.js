import express from "express";
import { addReview, deleteReview, getReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/",addReview)
reviewRouter.get("/",getReview)
reviewRouter.delete("/:email",deleteReview)

export default reviewRouter;