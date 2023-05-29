import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    message: {type:String, required: true},
    rating: {type: Number, required: true}
})

const reviewModel = mongoose.model('Review', ReviewSchema);

export default reviewModel;