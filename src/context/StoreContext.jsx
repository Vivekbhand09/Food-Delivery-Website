// To access each food item we use context API
import { createContext,  useEffect,  useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  
    const[cartItems,setCartItems]=useState({});
    
    //for adding item into the cart
    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    }
    

     //for removing  item into the cart it wil decrease item by 1
     const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
    
    
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0){
                let itemInfo=food_list.find((product)=>product._id===item)
                totalAmount += itemInfo.price*cartItems[item];
            }
          
        }
        return totalAmount;
    }


    const contextValue = {
        food_list,
        cartItems,
      setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
