
const {userModel}=require("../models/User.model");

const Validator=async(req,res,next)=>{
    const {userName,mobileNo,email}=req.body;

    let check=await userModel.find({"userName":userName});
    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
      };
  
    if(check.length===0 && mobileNo.length===10 && validateEmail(email)){
        next()
    }else{
        res.send("please enter valid details")
    }

}

module.exports={
    Validator
}