import{createContext, useEffect, useState} from "react";
import axios from "axios";

export const StroreContext =createContext(null)
 const StroreContextProvider=(props)=>{
    const [cartItem,setcartItem]=useState({})
    const url="http://localhost:4000"
    const [token,settoken]=useState("");
    const[food_list,setfoodlist]=useState([]);
    const addtoCart = async(itemId) => {
      try {
        if (!itemId) return;
        
        setcartItem((prev) => {
          const currentCount = prev[itemId] || 0;
          return { ...prev, [itemId]: currentCount + 1 };
        });

        if (token) {
          await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        // Revert the cart state if API call fails
        setcartItem((prev) => {
          const currentCount = prev[itemId] || 0;
          return { ...prev, [itemId]: Math.max(0, currentCount - 1) };
        });
      }
    }
    const removefromCart = async(itemId) => {
      try {
        if (!itemId) return;

        setcartItem((prev) => {
          const currentCount = prev[itemId] || 0;
          return { ...prev, [itemId]: Math.max(0, currentCount - 1) };
        });

        if (token) {
          await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
      } catch (error) {
        console.error("Error removing from cart:", error);
        // Revert the cart state if API call fails
        setcartItem((prev) => {
          const currentCount = prev[itemId] || 0;
          return { ...prev, [itemId]: currentCount + 1 };
        });
      }
    }

    const fetchlist = async () => {
      try {
        const response = await axios.get(url + "/api/food/list");
        if (response.data && response.data.data) {
          setfoodlist(response.data.data);
        } else {
          console.error("Invalid food list data format");
          setfoodlist([]);
        }
      } catch (error) {
        console.error("Error fetching food list:", error);
        setfoodlist([]);
      }
    }

   const loadCartData = async (token) => {
     try {
       if (!token) return;

       const response = await axios.post(
         url + "/api/cart/get",
         {},
         {
           headers: {
             token: token
           }
         }
       );

       if (response.data && response.data.cartdata) {
         setcartItem(response.data.cartdata);
       } else {
         setcartItem({});
       }
     } catch (error) {
       console.error("Error loading cart data:", error);
       setcartItem({});
     }
   };

const validateToken = (token) => {
  if (!token) return false;
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    return Date.now() < expirationTime;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

const clearUserSession = () => {
  localStorage.removeItem('token');
  settoken('');
  setcartItem({});
};

useEffect(() => {
  async function loaddata() {
    try {
      await fetchlist();
      const storedToken = localStorage.getItem("token");
      
      if (storedToken && validateToken(storedToken)) {
        settoken(storedToken);
        await loadCartData(storedToken);
      } else if (storedToken) {
        // Token exists but is invalid or expired
        clearUserSession();
        alert("Your session has expired. Please log in again.");
      }
    } catch (error) {
      console.error("Error in initial data loading:", error);
      setfoodlist([]);
      setcartItem({});
    }
  }
  loaddata();

  // Check token validity periodically
  const tokenCheckInterval = setInterval(() => {
    const currentToken = localStorage.getItem("token");
    if (currentToken && !validateToken(currentToken)) {
      clearUserSession();
      alert("Your session has expired. Please log in again.");
    }
  }, 60000); // Check every minute

  return () => clearInterval(tokenCheckInterval);
}, []);


const getTotalAmount = () => {
  let totalAmount = 0;
  for (const item in cartItem) {
    if (cartItem[item] > 0) {
      let itemInfo = food_list.find((product) => product._id === item);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItem[item]; // Use += to accumulate
      }
    }
  }
  return totalAmount;
};


     const contextvalue = {
        food_list,
        cartItem,
        addtoCart,
        removefromCart,
        getTotalAmount,
        url,
        token,
        settoken,
        validateToken,
        clearUserSession
     }
     return(
        <StroreContext.Provider value={contextvalue}>
            {props.children}
        </StroreContext.Provider>
     )
 }

 export default StroreContextProvider