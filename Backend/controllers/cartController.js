import usermodel from "../models/usermodel.js";

const addtoCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.user.id;

    if (!userId || !itemId) {
      return res.json({
        success: false,
        message: "Missing userId or itemId",
      });
    }

    let userData = await usermodel.findOne({ _id: userId });

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    let cartdata = userData.cartdata || {};

    if (!cartdata[itemId]) {
      cartdata[itemId] = 1;
    } else {
      cartdata[itemId] += 1;
    }

    await usermodel.findByIdAndUpdate(userId, { cartdata });

    res.json({
      success: true,
      message: "Added to Cart",
      cartData: cartdata,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


const removeCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;

    if (!userId || !itemId) {
      return res.json({
        success: false,
        message: "Missing userId or itemId",
      });
    }

    let userData = await usermodel.findById(userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    let cartdata = userData.cartdata || {};

    if (cartdata[itemId] > 0) {
      cartdata[itemId] -= 1;
      if (cartdata[itemId] === 0) {
        delete cartdata[itemId];
      }
    } else {
      return res.json({
        success: false,
        message: "Item not in cart",
      });
    }

    await usermodel.findByIdAndUpdate(
      userId,
      { $set: { cartdata } },
      { new: true }
    );

    res.json({
      success: true,
      message: "Removed from Cart",
      cartData: cartdata,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    let userData = await usermodel.findById(userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    let cartdata = userData.cartdata || {};

    res.json({
      success: true,
      cartdata,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



export {addtoCart,removeCart,getCart}