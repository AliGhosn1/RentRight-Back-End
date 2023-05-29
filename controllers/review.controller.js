import mongoose from "mongoose";

import Property from "../mongodb/models/property.js";
import User from "../mongodb/models/user.js";
import Review from "../mongodb/models/review.js";

const getAllReviews = async (req, res) => {
    try{
        const reviews = await Review.find({});

        res.status(200).json(reviews);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

const createNewReview = async (req, res) => {
    try{
        const { email, message, rating, propertyId } = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne ({ email }).session(session);
        const property = await Property.findOne ({ _id: propertyId }).session(session);

        if(!user) throw new Error('User Not Found');
        if(!property) throw new Error('Property Not Found');

        const newReview = await Review.create({
            user: user._id,
            message,
            rating
        });
        
        property.allReviews.push(newReview._id);

        await property.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "Review created successfully" });
    } catch(error){
        res.status(500).json({ message: error.message });
    }
};

export {
    createNewReview,
    getAllReviews
}