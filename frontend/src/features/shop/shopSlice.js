import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shops: []
};
const shopsStr = 'shops';
export const shops = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setShops: (state, action) => {
      const updatedState = { ...state };
      updatedState[shopsStr] = action.payload;
      return updatedState;
    },
    removeShop: (state, action) => {
      state.shops.map((shop, index) => {
        if (shop._id === action.payload._id) {
            state.shops.splice(index, 1);
        }
        return state.shops;
      });
    },
    appendShop: (state, action) => {
      state.shops.push(action.payload);
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  setShops, removeShop, appendShop
} = shops.actions;

export default shops.reducer;
