import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice.js';
import shopReducer from '../features/shop/shopSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer
  },
})
