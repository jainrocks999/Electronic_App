import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from './Api'; // Import API methods
import { ToastAndroid } from 'react-native';

// Thunk for login
export const loginUser = createAsyncThunk(
  'login/loginUser', 
   
  async ({ url,user,navigation }, { rejectWithValue }) => {
  
    
    try {
   
      let data = new FormData();
      data.append('phone_no', phone_no);

      const res = await Api.login(data);

   
      
      if (res?.success) {
        return res; // Return response if success
      } else {
        ToastAndroid.show(res?.error?.message, ToastAndroid.SHORT);
        return rejectWithValue(res?.error?.message); // Return error message
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      return rejectWithValue('Login failed');
    }
  }
);