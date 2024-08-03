import {createSlice} from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    currentLocation: null,
    address: ''
  },
  reducers: {
    setLocationState: (state, action) => {
      state.currentLocation = action.payload;
    },

    setAddressState: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const {setLocationState, setAddressState} = locationSlice.actions;
export default locationSlice.reducer;
