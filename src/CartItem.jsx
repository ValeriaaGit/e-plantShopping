import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  // ----- States -----
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    console.log("Inside calculate total amount");
    let total = 0;

    cart.forEach(item => {
      const price = parseFloat(item.cost.substring(1));

      total += price * item.quantity;
    });

    return total;
  };

  const handleContinueShopping = (e) => {
   onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    // Prevent page reload if this is called from a form button
    if (e) e.preventDefault();

    // Check if the cart is empty before proceeding
    if (cart.lenght === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Calculate final totals
    const totalAmount = calculateTotalAmount();

    // Create an order object for the database or API
    const orderDetail = {
      items: cart,
      total: totalAmount,
      timestamp: new Date().toISOString(),
    };

    console.log("Order Processed: ", orderDetail);

    // Cleanup: clear the Redux cart and local UI state
    dispatch(clearCart()); // create this action in redux
    setAddedToCart({}); // reset local 'Added' buttons


  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({name: item.name, quantity: item.quantity + 1}));
  };

  const handleDecrement = (item) => {
   if (item.quantity >= 1) {
    dispatch(updateQuantity({name: item.name, quantity: item.quantity - 1}));
   } else {
    handleRemove(item);
   }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    console.log("Inside calculate total cost");

    let total = 0;
    const price = parseFloat(item.cost.substring(1));
    total += price * item.quantity;

    return total;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />

            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>

              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        {/* --- Checkout button --- */}
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


