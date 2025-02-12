import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../redux/slice/Authsclice';
import homeSlice from '../redux/slice/Homesclice';
import addressSlice from '../redux/slice/AddressSclice';
import ordderSclice from '../redux/slice/orderSclice';
const store = configureStore({
  reducer: {
    Auth: authSlice,
    home:homeSlice,
    address:addressSlice, 
    order:ordderSclice
  },
});

export default store;
