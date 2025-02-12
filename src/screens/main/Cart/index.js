import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Mat from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import styles from './styles';
import he from 'he';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import BottumTab from '../../../compoents/BottumTab';
import Loader from '../../../compoents/Loader';
import {
  productDetail,
  getTocard,
  addToCard,
  removeCart,
} from '../../../redux/slice/Homesclice';
import Imagepath from '../../../compoents/Imagepath';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
const Cart = ({navigation}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.home?.Carts);

  const [newData, setNewData] = useState(1);
  const focus = useIsFocused();
  const [load, setLoading] = useState(false);

  const loader = useSelector(state => state.home?.loading);

  let total = 0;
  useEffect(() => {
    getItems();
  }, [focus]);
  const getItems = async () => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    dispatch(
      getTocard({
        url: 'cart',
        token: token,
        user_id: userid,
      }),
    );
  };
  const cartRemove = async item => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    await dispatch(
      removeCart({
        user_id: userid,
        id: item.rowid,
        token: token,

        url: 'remove-to cart',
      }),
    );
  };
  const totalAmount2 = () => {
    let total = 0;
    data != undefined || data != null
      ? data?.map((item, index) => {
          const pri = item?.subtotal.replace(/\$/g, '');
          total = total + parseInt(pri);
        })
      : null;

    return total;
  };
  const incrementQuantity = itemId => {
    setNewData(prevData =>
      prevData.map((item, index) =>
        index === itemId
          ? {
              ...item,
              quantity: parseInt(item.quantity) + 1,
              price: (
                parseFloat(item.price) *
                (parseInt(item.quantity) + 1)
              ).toFixed(2),
            }
          : item,
      ),
    );
  };
  const decrementQuantity = itemId => {
    setNewData(prevData =>
      prevData.map((item, index) =>
        index === itemId && parseInt(item.quantity) > 0
          ? {
              ...item,
              quantity: parseInt(item.quantity) - 1,
              price: (
                parseFloat(item.price) *
                (parseInt(item.quantity) - 1)
              ).toFixed(2),
            }
          : item,
      ),
    );
  };
  const handleDetail = async item => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    await dispatch(
      productDetail({
        user: userid,
        id: item.product_id,
        token: token,

        url: 'fetch-single-product',
        navigation,
      }),
    );
  };

  const addCart = async (item, status) => {
    try {
      let uqty = 0;
      status ? (uqty = item.qty + 1) : (uqty = item.qty - 1);

      const token = await AsyncStorage.getItem('Token');
      const userid = await AsyncStorage.getItem('user_id');

      let data = {
        rowid: item.rowid,
        qty: uqty,
        user_id: userid,
      };

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://ecom.craftsweb.co.in/public/api/v1/update-to-cart',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      };

      setLoading(true);

      const response = await axios.request(config);

      if (response.data.status == 200) {
        console.log('Cart updated successfully', JSON.stringify(response.data));
        getItems();
        Toast.show(response.data.msg);
      } else {
        Toast.show(response.data.msg);
      }
    } catch (error) {
      console.log('Error updating cart:', error);
      Toast.show('An error occurred while updating the cart.');
    } finally {
      setLoading(false);
    }
  };
  const removeHtmlTags = str => {
    return str?.replace(/<\/?[^>]+(>|$)/g, '');
  };
  return (
    <View style={{flex: 1, backgroundColor: '#FCE7C8'}}>
      {loader || load ? <Loader /> : null}
      <View style={styles.header}>
        <View style={styles.back}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={wp(5.9)}
            color="#000000"
          />
          <Text style={{fontSize: wp(4.5), color: '#000000', width:'100%', marginLeft:wp(5), fontFamily:'Mulish-Bold'}}>Shopping Cart</Text>
        </View>
      </View>
      <View style={{flex: 1, padding:wp(2)}}>
        {data?.length == 0 ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Your cart is empty</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View style={styles.listContainer}>
                  <View style={styles.imgContainer}>
                    <TouchableOpacity onPress={() => handleDetail(item)}>
                      <Image
                        style={styles.img}
                        source={{uri: `${Imagepath.Path}${item.option.image}`}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.itemContainer}>
                    <Text
                      style={{
                        marginTop: '4%',
                        fontSize: wp(3.5),
                       fontFamily:'Mulish-SemiBold',
                       color:"#000000",
                        width: '90%',
                      }}>
                     {removeHtmlTags(item.name)
                        ?.split('\n')
                        .filter(line => line.trim())[0]
                        ?.substring(0, 30)}
                      ...{' '}
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: wp(1),
                        alignItems: 'center',
                      }}>
                      <Text style={{fontSize: wp(4),  fontFamily:'Mulish-SemiBold',}}>
                        Base price:
                      </Text>
                      <Text
                        style={{
                          fontFamily:'Mulish-Bold',
                          color: 'black',
                          fontSize: wp(4),
                          marginLeft: 5,
                          // textDecorationLine: 'line-through',
                        }}>
                        ₹ {item?.price}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: wp(1),
                        alignItems: 'center',
                      }}>
                      <Text style={{fontSize: wp(4),  fontFamily:'Mulish-SemiBold',}}>
                        Subtotal:
                      </Text>

                      <Text
                        style={{
                          fontFamily:'Mulish-Bold',
                          color: 'black',
                          fontSize: wp(4),
                          marginLeft: 5,
                        }}>
                        ₹ {item.subtotal}
                      </Text>
                    </View>
                    <Text style={{marginLeft: '1%', color: 'grey'}}>
                      14 days return policy
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: hp(3),
                        width: wp(20),
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginVertical: wp(3),
                      }}>
                      <View style={{}}>
                        <TouchableOpacity
                          disabled={item.qty == 1}
                          onPress={() => addCart(item, false)}
                          style={{
                            height: hp(2.5),
                            width: hp(2.5),
                            alignItems: 'center',
                            borderWidth: 1,
                            justifyContent: 'center',
                            borderRadius: wp(1),
                          }}>
                          <Entypo
                            name="minus"
                            style={{
                              size: wp(5),
                              color: item?.qty == 1 ? 'grey' : '#FFDE4D',
                            }}
                          />
                        </TouchableOpacity>
                      </View>

                      <Text style={{fontSize: wp(4), fontWeight: '600'}}>
                        {item.qty}
                      </Text>
                      <View
                        style={{
                          height: hp(2.5),
                          width: hp(2.5),
                          alignItems: 'center',
                          borderWidth: 1,
                          justifyContent: 'center',
                          borderRadius: wp(1),
                        }}>
                        <TouchableOpacity
                          onPress={() => addCart(item, true)}
                          style={styles.quantity}>
                          <Entypo name="plus" size={wp(4.5)} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      cartRemove(item);
                    }}
                    style={{
                      position: 'absolute',
                      top: 7,
                      right: 0,
                      height: hp(4),
                      width: wp(8),
                      alignItems: 'center',
                    }}>
                    {/* <Text style={{fontSize: wp(4), color: 'grey'}}>X</Text> */}
                    <AntDesign name="delete" size={wp(5)} color="#ff0000" />
                  </TouchableOpacity>
                </View>
              )}
            />
            <View style={{padding: 20}}>
              <Text style={{fontSize: 20, fontFamily:'Mulish-Bold', color:'#000000'}}>
                Total Amount: ₹ {totalAmount2().toFixed(2)}
              </Text>
            </View>

            <View style={styles.placeContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProductList')}
                style={[styles.btn, {marginBottom: hp(1)}]}>
                <Text style={styles.btnText}>Continue Shopping</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Shipping', {
                    item: data,
                    ammount: totalAmount2(),
                  })
                }
                style={styles.btn}>
                <Text style={styles.btnText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      {/* <BottumTab /> */}
    </View>
  );
};
export default Cart;
