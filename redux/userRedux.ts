import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
  },
  reducers: {
    setUserState: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const {setUserState} = userSlice.actions;
export default userSlice.reducer;
