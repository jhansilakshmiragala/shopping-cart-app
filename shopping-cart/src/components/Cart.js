import React from "react"; 
const Cart=({
    cart,updateQuantity
}) => {
    return(
        <div className="cart">
            <h2 className="cart-title">Cart</h2>
            {cart.length===0 ? (
                <p className="empty-cart">No items in the cart</p>
            ):(
                cart.map((item)=>(
                    <div key={item.id} className="cart-item">
                        <p className="cart-item-name">{item.name} - ₹{item.price} x {item.quantity}</p>
                        <button className="update-btn" onClick={()=> updateQuantity(item.id,item.quantity+1)}> + </button>
                        <button className="update-btn" onClick={()=> updateQuantity(item.id,item.quantity-1)}> - </button>
                        <button className="remove-btn" onClick={()=> updateQuantity(item.id,0)}>Remove</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cart;