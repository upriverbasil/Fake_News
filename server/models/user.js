import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    id:{type:String},
    upvoted: {
        type: [String],
        default: []
    },
    downvoted: {
        type: [String],
        default: []
    },
})

const user = mongoose.model('User',userSchema)

export default user;