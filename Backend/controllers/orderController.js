import orderModel from "../models/orderModel.js";
import usermodel from "../models/usermodel.js";
import Stripe from 'stripe';

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174";

  try {
    // console.log("Stripe key loaded:", process.env.STRIPE_SECRET_KEY);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Save order
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    });
    await newOrder.save();
    

    // Clear user's cart
    await usermodel.findByIdAndUpdate(req.body.userId, { cartdata: {} });

    // Prepare Stripe line items
    const line_items = req.body.items.map(item => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100 * 80
      },
      quantity: item.quantity
    }));

    // Add Delivery Charge as a separate line item
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charge"
        },
        unit_amount: 2 * 100 * 80
      },
      quantity: 1
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: line_items,
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({
      success: true,
      session_url: session.url
    });

  } catch (error) {
    console.log("Stripe error:", error.message);
    res.json({ success: false, message: error.message });
  }
};




const verifyOrder=async(req,res)=>{
const {orderId,success}=req.body;
try{
  if(success=="true"){
    await ordermodel.findByIdAndUpdate(orderId,{payment:true});
  }else{
 await orderModel.findByIdAndDelete();
 res.json({success:false,message:"not paid"})
  }
}catch(error){
     console.log(error)
     res.json({success:false,message:"error"})
}
}
//userorder

const userOrders=async(req,res)=>{
try {
  const order=await orderModel.find({userId:req.body.userId})
  res.json({success:true,data:order})
} catch (error) {
  console.log(error);
  res.json({success:false,message:"error"})
}
}

const listOrder=async(req,res)=>{
try {
  const order=await orderModel.find({});
  res.json({success:true,data:order})
} catch (error) {
  console.log(error);
  res.json({success:true,message:"Error"})
  
}
}


export { placeOrder,verifyOrder,userOrders,listOrder };
