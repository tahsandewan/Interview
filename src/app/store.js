import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import data from "../reducers/dataListReducer"
export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    userData:data
  },
});
