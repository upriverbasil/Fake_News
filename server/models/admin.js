import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    email:{type:String, required:true}
    },{versionKey: false
})

const admin = mongoose.model('Admin',adminSchema)

export default admin;