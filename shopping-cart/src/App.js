import "./App.css";
import React, {useState,useEffect} from "react"; 
import ProductList from "./components/ProductList"; 
import Cart from "./components/Cart";

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];
const FREE_GIFT = { id: 99, name: "Free Wireless Mouse", price: 0 ,quantity:1}; 

const App=()=>{
  const [cart,setCart]=useState([]); 

  const addToCart=(product)=>{
    setCart((prevCart)=>{
      const existingItem=prevCart.find((item)=>item.id===product.id);
      if(existingItem){
        return prevCart.map((item)=>
        item.id===product.id ? {
          ...item, 
          quantity:item.quantity+1 
        }:item 
      );
      } else {
        return [...prevCart,{
          ...product,
          quantity:1
        }];
      }
    });
  }; 

  const updateQuantity=(id,newQuantity)=>{
    setCart((prevCart)=>{
      if (newQuantity <= 0) {
        return prevCart.filter((item)=> item.id !== id);
      } else {
        return prevCart.map((item)=>
        item.id===id ? {
          ...item,
          quantity:newQuantity
        } :item
      );
      }
    });
  }; 

  useEffect(()=>{
    const subtotal=cart.reduce((sum,item)=>sum + item.price * item.quantity,0); 
    const hasGift=cart.some((item)=> item.id=== FREE_GIFT.id);
    
    if(subtotal>=1000 && !hasGift){
      setCart((prevCart)=> [...prevCart,FREE_GIFT]);
    }else if(subtotal<1000 && hasGift){
      setCart((prevCart)=> prevCart.filter((item)=> item.id !==FREE_GIFT.id));
    }
  },[cart]);

  const calculateSubtotal=()=>{
    return cart.reduce((sum,item)=>sum+ item.price * item.quantity,0);
  }; 

  const getFreeGiftMessage=(subtotal)=>{
    if (subtotal >= 1000){
      return "You got a wireless mouse!";
    }else{
      const remainingAmount=1000-subtotal; 
      return `Add ₹${remainingAmount} more to get free wireless mouse`;
    }
  };

  return(
  <div className="app">
    <h1 className="title">Shopping Cart</h1>
    <ProductList products={PRODUCTS} addToCart={addToCart}/> 
    <Cart cart={cart} updateQuantity={updateQuantity}/>
    {/*subtotal display*/}
    <div className="subtotal-container">
      <h3 className="subtotal">Subtotal: ₹{calculateSubtotal()}</h3>
      <p className="gift-message">{getFreeGiftMessage(calculateSubtotal())}</p>
    </div>
  </div>);
}; 

export default App;
