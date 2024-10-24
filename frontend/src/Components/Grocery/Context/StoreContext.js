import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "https://flashfeast-backend.vercel.app";
    const [token,settoken] = useState("");
    const [username, setUsername] = useState("");
    const [products,setProducts] = useState([]);
    const [unavailableIngredients, setUnavailableIngredients] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if(token){
            await axios.post(url + "/api/cart/add", {itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(token){
            await axios.post(url + "/api/cart/remove", {itemId},{headers:{token}})
        }
    }

    const fetchProductList = async () => {
        const response = await axios.get(url + "/api/product/list");
        setProducts(response.data.data);
    }

    const loadCartData = async(token) => {
        const response = await axios.post(url + "/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
    }


    useEffect(() => {
        async function loadData(){
            await fetchProductList();
            if(localStorage.getItem("token")){
                settoken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
            if(localStorage.getItem("username")){
                setUsername(localStorage.getItem("username"));
            }
        }
        loadData();
    }, []);

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = products.find((product) => product.id === parseInt(item));
                const priceVal = parseFloat(itemInfo.price.replace(/[^\d.]/g, ''));
                totalAmount += priceVal * cartItems[item];
            }
        }
        return totalAmount;
    }


    const contextValue = {
        products,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        settoken,
        username,
        setUsername,
        unavailableIngredients, 
        setUnavailableIngredients
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;