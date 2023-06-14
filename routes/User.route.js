const express=require("express")
const {userModel}=require("../models/User.model");
const { Validator } = require("../middlewares/validate");
const userRouter = express.Router()

require("dotenv").config();

userRouter.get("/getUser", async(req,res)=>{
    try {
        const data = await userModel.find();
        res.send(data);
        res.status(200).send("All the Users")
      } catch (err) {
        console.log(err);
      }
})

userRouter.get("/:id",async(req,res)=>{
    const Id=req.params.id;
    try {
        const data = await userModel.find({"_id":Id});
        res.send(data);
        res.status(200).send("Particular User")
      } catch (err) {
        console.log(err);
      }
})



userRouter.patch("/:id", async(req,res)=>{
    const payload = req.body
    const id = req.params.id
    const user = await userModel.findOne({"_id":id})
    const userID_in_user=user.userID_in_user
    const userID_making_req =req.body.userID
    try{
        if(userID_making_req!==userID_in_user)
        {
            res.send({"msg":"You are not authorized"})
        }
        else{
            await userModel.findByIdAndUpdate({"_id":id},payload)
            res.status(204).send("Updated the Data of User")
        }
    }
    catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})

userRouter.delete("/:id", async(req,res)=>{
    const id = req.params.id
    const user = await userModel.findOne({"_id":id})
    const userID_in_user=user.userID_in_user
    const userID_making_req = req.body.userID
    try{
        if(userID_making_req!==userID_in_user)
        {
            res.send({"msg":"You are not authorized"})
        }
        else{
            await userModel.findByIdAndDelete({"_id":id})
            res.status(202).send("Deleted the Data of User")
        }
    }
    catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})

userRouter.use(Validator);

userRouter.post("/addUser", async(req,res)=>{
    const payload = req.body;
    console.log(payload,"paylaod")
    try{
        const new_user= new userModel(payload)
        await new_user.save()
        res.status(201).send("Added new User")
    }
    catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})

module.exports={
    userRouter
}