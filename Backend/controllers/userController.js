import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken"
import bcrypt from  "bcrypt"
import validator from "validator"


//login-user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "user does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "password Invalid" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

const registerUser=async(req,res)=>{    
    const {name,password,email}=req.body;
    try{
        const exists=await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"Email already exists"})
        }

        if(!validator.isEmail(email)){
             return res.json({success:false,message:"Enter a valid Email"})
        }

        if(password.length<8){
             return res.json({success:false,message:"Enter a strong 8 character password"})
        }

        //hasshing user-password

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new userModel({
            name:name,
          email:email,
          password:hashedPassword
        });

     const user=   await newUser.save()
         const token=createToken(user._id)
        //  console.log("JWT_SECRET:", process.env.JWT_SECRET);
         res.json({success:true,token})

    }catch(error){
          console.log(error)
           res.json({success:false,message:"Error"})
    }
     
}




export {loginUser,registerUser}