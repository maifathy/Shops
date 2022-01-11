import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: 'pending',
  user:  {}
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoading: (state) => {
      if (state.loading === 'idle' && Object.keys(state.user).length === 0) {
        state.loading = 'pending';
      }
    },
    setAuthUser: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.user = action.payload;
    },
    removeAuthUser: () => {
      return initialState;
    },
  },
})

// Action creators are generated for each case reducer function
export const { userLoading, setAuthUser, removeAuthUser } = user.actions;

export default user.reducer;
