import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

const store = configureStore({
    reducer: { // root reducer object
        cart: cartReducer, // 'cart' is the name of the slice in the store, and it's managed by cartReducer
    },
});

export default store; // Export the store for use in the app (e.g., in <Provider store={store}>)
