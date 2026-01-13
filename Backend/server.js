import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js"
import useRouter from "./routes/userRoute.js";
import dotenv from 'dotenv';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
dotenv.config({ path: './.env' });

// console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);
// console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY);

const app=express();
const port=4000

app.use(express.json())
app.use(
  cors({
    origin: [
      "https://foodadmin-92r9.onrender.com", // deployed frontend
      "http://localhost:5173",               // optional for local dev
    ],
    credentials: true,
  })
);

//db connect
connectDB();


//api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",useRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)



app.get("/",(req,res)=>{
     res.send("Api working")
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})

//<sandip9211>
//mongodb+srv://<db_username>:<db_password>@cluster0.dxhud6c.mongodb.net/?
