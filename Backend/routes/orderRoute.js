import express from "express";

import authMiddleware from "../middleware/auth.js";
import { listOrder, placeOrder, userOrders, verifyOrder } from "../controllers/orderController.js";
import jwt from "jsonwebtoken";
const { verify } = jwt;

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);

orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userOrders",authMiddleware,userOrders)
orderRouter.get("/list",listOrder)
export default orderRouter;
