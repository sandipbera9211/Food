import mongoose from "mongoose";

export const connectDB=async()=>{
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Food';
    await mongoose.connect(mongoURI).then(()=>console.log("Db connected"));
}