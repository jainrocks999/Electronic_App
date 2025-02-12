import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import constant from './constants';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUp from '../screens/Auth/SignUp';
// Async thunk to handle the login API call
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({user, navigation, url}, {rejectWithValue}) => {
    console.log('dataa ', url, user, navigation);

    let data = {
      phone_no: user,
    };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${constant.mainUrl}${url}`,
      headers: {
        //  'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    try {
      const response = await axios.request(config);
      if (response.data.status == 200) {
       
        AsyncStorage.setItem('Otp', response.data.OTP);
        AsyncStorage.setItem('user_id',response.data.user_id)
        AsyncStorage.setItem('Token', response.data.token);
        Toast.show(response.data.msg);
        navigation.replace('Forget', {data: response.data, item: user,register:true});
        return response.data;
      } else {
        Toast.show(response.data.msg);
        console.log('errrorroro', response.data);
        return rejectWithValue(error.response?.data || error.message);
      }

      return response.data; // Return the API response data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({user, navigation, url}, {rejectWithValue}) => {
    console.log('dataa ', url, user, navigation);

    let data = {
      phone: user.telephone,
    };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${constant.mainUrl}${url}`,
      headers: {
        //  'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    try {
      const response = await axios.request(config);
     
      if (response.data.status == 200) {
        //  AsyncStorage.setItem('Otp',response.data.OTP);
        Toast.show(response.data.msg);
        navigation.replace('Forget', {data: response.data, item: user,register:false});
        return response.data;
      } else {
        Toast.show(response.data.msg);
        console.log('errrorroro', response.data);
        return rejectWithValue(error.response?.data || error.message);
      }

      return response.data; // Return the API response data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({user, navigation, url}, {rejectWithValue}) => {
    console.log('dataa ', url, user, navigation);

    let data = {
      name: user.firstname,
      email:user.email,
      phone:user.telephone
    };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${constant.mainUrl}${url}`,
      headers: {
        //  'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    try {
      const response = await axios.request(config);
     
      if (response.data.status == 200) {
        AsyncStorage.setItem('Otp', response.data.OTP);
        AsyncStorage.setItem('Token', response.data.token);
        AsyncStorage.setItem('user_id',response.data.data.id)
        Toast.show(response.data.msg);
        navigation.replace('Home');
        return response.data;
      } else {
        Toast.show(response.data.msg);
        console.log('errrorroro', response.data);
        return rejectWithValue(error.response?.data || error.message);
      }

      // return response.data; // Return the API response data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);





// Creating a slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
    registerotp: [],
    SignUp:[],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registerotp = action.payload; 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      .addCase(signUpUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.SignUp = action.payload; 
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export const {clearError} = authSlice.actions;

export default authSlice.reducer;
