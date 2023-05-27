import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required: true},
    avatar: {type:String, required: true},
    number: {type:String, required: true},
    address: {type:String, required: true},
    allProperties: [{type: mongoose.Schema.Types.ObjectId, ref: 'Property'}]
})

const userModel = mongoose.model('User', UserSchema);

export default userModel;