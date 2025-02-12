import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import constant from '../constants';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const product = createAsyncThunk(
  'home/product',
  async ({id, token, url}, {rejectWithValue}) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}?user_id=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);
     
      if (response.data.status == 200) {
        // Toast.show(response.data.msg);
        return response?.data?.data;
      } else {
        Toast.show(response.data.msg);
      }
    } catch (error) {
      // Toast.show(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const category = createAsyncThunk(
  'home/category',
  async ({id, token, url}, {rejectWithValue}) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}?user_id=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
// console.log(config, 'hbfvsdjhbvjdf9999999999999999999')
      const response = await axios.request(config);

      if (response.data.status == 200) {
        // Toast.show(response.data.msg);
        return response?.data?.data;
      } else {
        Toast.show(response.data.msg);
      }
    } catch (error) {
      // Toast.show(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const addwishlist1 = createAsyncThunk(
  'home/addwishlist1',
  async ({user, id, token, isadd, url}, {dispatch, rejectWithValue}) => {
    let data = {
      user_id: user,
      product_id: id,
      is_add: isadd,
    };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${constant.mainUrl}${url}`,
      headers: {
        Authorization: `Bearer ${token}`,
        //  'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    try {
      const response = await axios.request(config);

      if (response.data.status == 200) {
        Toast.show(response.data.msg);
        await dispatch(product({id: user, token: token, url: 'products'}));
        await dispatch(
          WishlistData({
            url: 'wishlist-product',
            token: token,
            user_id: user,
            page: 1,
          }),
        );
        return response.data;
      } else {
        Toast.show(response.data.msg);
      }
      // return response.data; // Return the API response data
    } catch (error) {
      console.log('errorro', error);
      // Toast.show(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const productDetail = createAsyncThunk(
  'home/productDetail',
  async ({user, id, token, url, navigation}, {rejectWithValue}) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}?product_id=${id}&user_id=${user}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

    //  console.log(config,'hkgjhfgjhfjhfjhfhgfhf');


      const response = await axios.request(config);
      
       
      if (response.data.status == 200) {
        // Toast.show(response.data.msg);
        // navigation.navigate('Details');
        navigation.navigate('Categories', {screen: 'Details'});
        return response?.data?.data;
      } else {
        Toast.show(response.data.msg);
      }
    } catch (error) {
      // Toast.show(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const addToCard = createAsyncThunk(
  'home/addToCard',
  async ({user, id, qty, token, url}, {dispatch, rejectWithValue}) => {
    let data = {
      user_id: user,
      id: id,
      qty: qty,
    };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${constant.mainUrl}${url}`,
      headers: {
        Authorization: `Bearer ${token}`,

        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };


    try {
      const response = await axios.request(config);
      
      if (response?.data?.status == 200) {
        console.log('ghyughghuyg',response.data);
        Toast.show(response?.data?.msg);

         await dispatch(getTocard({url: 'cart', token: token, user_id: user}));
        
        return response.data;
      } else {
        Toast.show(response?.data?.msg);
      }
      
    } catch (error) {
      console.log('errorro', error);
     
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getTocard = createAsyncThunk(
  'home/getTocard',
  async ({user_id, token, url}, {rejectWithValue}) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}?user_id=${user_id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(config);

      if (response.data.status == 200) {
        // Toast.show(response.data.msg);
        // navigation.navigate('Details')
        return response?.data?.data;
      } else {
        Toast.show(response.data.msg);
      }
    } catch (error) {
      // Toast.show(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const removeCart = createAsyncThunk(
  'home/removeCart',
  async ({user_id, id, token, url}, {dispatch, rejectWithValue}) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}?user_id=${user_id}&rowid=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(config);

      if (response.data.status == 200) {
        Toast.show(response.data.msg);
        await dispatch(
          getTocard({
            url: 'cart',
            token: token,
            user_id: user_id,
          }),
        );
        return response?.data;
      } else {
        Toast.show(response.data.msg);
      }
    } catch (error) {
      // Toast.show(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const WishlistData = createAsyncThunk(
  'home/WishlistData',
  async ({user_id, page, token, url}, {rejectWithValue}) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}?user_id=${user_id}&page=${page}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(config);

      if (response.data.status == 200) {
        // Toast.show(response.data.msg);
        // navigation.navigate('Details')
        return response?.data;
      } else {
        Toast.show(response.data.msg);
      }
    } catch (error) {
      console.log('error wishlist', error);

      // Toast.show(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const Banner = createAsyncThunk(
  'home/Banner',
  async ({id, token, url}, {rejectWithValue}) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}?user_id=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(config);

      if (response.data.status == 200) {
        // Toast.show(response.data.msg);

        return response?.data;
      } else {
        Toast.show(response.data.msg);
      }
    } catch (error) {
      console.log('banner error ', error);

      // Toast.show(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const productsbycategories = createAsyncThunk(
  'home/productsbycategories',
  async ({id, category, token, url, navigation}, {rejectWithValue}) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}?user_id=${id}&category_id=${category}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(config);
      if (response.data.status == 200) {
        // Toast.show(response.data.msg);

        return response?.data?.data;
      } else {
        Toast.show(response.data.msg);
      }
    } catch (error) {
      console.log('categorirds ', error);

      // Toast.show(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const searchQ = createAsyncThunk(
  'home/searchQ',
  async ({userid, q, url, token}, {dispatch, rejectWithValue}) => {
    console.log('dataa searchcd   ', url, q, userid, token);

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${constant.mainUrl}${url}?user_id=${userid}&q=${q}`,
      headers: {
        Authorization: `Bearer ${token}`,
        //  'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.request(config);

      if (response.data.status == 200) {
        // Toast.show(response.data.msg);
        AsyncStorage.setItem('query', q);
        return response.data.data;
      } else {
        Toast.show(response.data.msg);
      }
      // return response.data;
    } catch (error) {
      console.log('errorro', error);
      // Toast.show(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const brands = createAsyncThunk(
  'home/brands',
  async ({id, url, token}, {dispatch, rejectWithValue}) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${constant.mainUrl}${url}?user_id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        //  'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.request(config);

      if (response.data.status == 200) {
        // Toast.show(response.data.msg);
        return response.data?.data;
      } else {
        Toast.show(response.data.msg);
      }
    } catch (error) {
      console.log('errorro', error);
      // Toast.show(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const brandcategory = createAsyncThunk(
  'home/brandcategory',
  async (
    {id, url, token, user, navigation, nav},
    {dispatch, rejectWithValue},
  ) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${constant.mainUrl}${url}?user_id=${user}&brand_id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        //  'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.request(config);

      if (response.data.status == 200) {
        // Toast.show(response.data.msg);
        {
          nav == true ? navigation.navigate('Categories', {screen:'Subcategory1'}) : null;
        }
        return response.data?.data;
      } else {
        {
          nav == true ? Toast.show(response.data.msg) : null;
        }
      }
    } catch (error) {
      console.log('errorro', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
const homeSlice = createSlice({
  name: 'home',
  initialState: {
    product: [],
    Categories: [],
    addwish: [],
    ProductDetails: [],
    addToCard1: [],
    Carts: [],
    removecarts: [],
    WishlistD: [],
    Bannerdata: [],
    catbyproduct: [],
    searchQu: [],
    Brand: [],
    Brandcat: [],
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
      .addCase(product.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(product.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(product.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(category.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(category.fulfilled, (state, action) => {
        state.loading = false;
        state.Categories = action.payload;
        // console.log('Category Data:', action.payload);
      })
      .addCase(category.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // console.error('Category API Error:', action.error);
      })
      .addCase(addwishlist1.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addwishlist1.fulfilled, (state, action) => {
        state.loading = false;
        state.addwish = action.payload;
      })
      .addCase(addwishlist1.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(productDetail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.ProductDetails = action.payload;
      })
      .addCase(productDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToCard.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCard.fulfilled, (state, action) => {
        state.loading = false;
        state.addToCard1 = action.payload;
      })
      .addCase(addToCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTocard.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTocard.fulfilled, (state, action) => {
        state.loading = false;
        state.Carts = action.payload;
      })
      .addCase(getTocard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.removecarts = action.payload;
      })
      .addCase(removeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(WishlistData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(WishlistData.fulfilled, (state, action) => {
        state.loading = false;
        state.WishlistD = action.payload;
      })
      .addCase(WishlistData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(Banner.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Banner.fulfilled, (state, action) => {
        state.loading = false;
        state.Bannerdata = action.payload;
      })
      .addCase(Banner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(productsbycategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productsbycategories.fulfilled, (state, action) => {
        state.loading = false;
        state.catbyproduct = action.payload;
      })
      .addCase(productsbycategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchQ.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchQ.fulfilled, (state, action) => {
        state.loading = false;
        state.searchQu = action.payload;
      })
      .addCase(searchQ.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(brands.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(brands.fulfilled, (state, action) => {
        state.loading = false;
        state.Brand = action.payload;
      })
      .addCase(brands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(brandcategory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(brandcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.Brandcat = action.payload;
      })
      .addCase(brandcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearError} = homeSlice.actions;

export default homeSlice.reducer;
