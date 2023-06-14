const mongoose=require("mongoose")

const userSchema= mongoose.Schema({
    userName:String,
    mobileNo:String,
    email:String,
    address:String,
    profilePic:String
})

const userModel= mongoose.model("user",userSchema)

module.exports={
    userModel
}