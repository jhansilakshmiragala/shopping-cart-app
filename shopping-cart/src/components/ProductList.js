import React from "react"; 

const ProductList=({
    products,
    addToCart
})=>{
    return(
        <div className="product-list">{products.map((product)=>(<div key={product.id} className="product-item">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">₹{product.price}</p> 
            <button className="add-to-cart-btn" onClick={()=>addToCart(product)}>Add to Cart</button>
            </div>))}</div>
    );
}; 

export default ProductList;