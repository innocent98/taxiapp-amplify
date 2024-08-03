import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './userRedux';
import locationReducer from './locationRedux';

const rootReducer = combineReducers({
  user: userReducer,
  location: locationReducer
  // ... other reducers
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
