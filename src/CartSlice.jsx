import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },

  reducers: {
    addItem: (state, action) => {
      // Destructure product details from the action payload
      const { name, image, cost } = action.payload;

      // Check if the item already exists in the cart by comparing names
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) { // if the item exists in the cart, increase its quantity
        existingItem.quantity++;
      } else { // if item does not exist, add it to the cart with quantity 1
        state.items.push({name, image, cost, quantity: 1});
      }
    },
    removeItem: (state, action) => { // keep all the items (plants) that do not match the info (payload) that is curently being passed
      state.items = state.items.filter(item => item.name !== action.payload);
      // .filter() creates a new array containing only the elements that pass a specific "test" (a condition)
    },
    updateQuantity: (state, action) => {
      // Destructure the product name and new quantity from the action payload
      const {name, quantity} = action.payload;

      // Find the item in the cart that matches the given name
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // if the item is found, update its quantity to the new value
      }
    },
    clearCart: (state) => { // clears the cart after checkout 
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;

export default CartSlice.reducer;
