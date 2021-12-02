import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    removeAuthUser: (state, action) => {
      state.user = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAuthUser, removeAuthUser } = userSlice.actions;

export default userSlice.reducer;
