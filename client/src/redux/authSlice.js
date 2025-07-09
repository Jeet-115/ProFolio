import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    checkingAuth: true, // 👈 NEW
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.checkingAuth = false;
    },
    logout: (state) => {
      state.user = null;
      state.checkingAuth = false;
    },
    stopChecking: (state) => {
      state.checkingAuth = false;
    }
  },
});

export const { setCredentials, logout, stopChecking } = authSlice.actions;
export default authSlice.reducer;
