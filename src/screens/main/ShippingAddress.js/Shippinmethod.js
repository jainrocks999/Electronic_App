import {View, Text, Alert, FlatList, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from '../Cart/styles';
import RazorpayCheckout from 'react-native-razorpay';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CustomCheckbox from '../../../compoents/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Imagepath from '../../../compoents/Imagepath';
import {
  getTocard,
  productDetail,
  removeCart,
} from '../../../redux/slice/Homesclice';
import Loader from '../../../compoents/Loader';
import {shipmethod} from '../../../redux/slice/orderSclice';
export default function Shippinmethod({route}) {
  const navigation = useNavigation();

  const getitem = route.params;

  const dispatch = useDispatch();
  const data2 = useSelector(state => state.home?.Carts);
  const data = useSelector(state => state?.order?.shipm);
  const loading1 = useSelector(state => state?.order?.loading);

  const [selectedOptions, setSelectedOptions] = useState(null);
  const [selectedOptions1, setSelectedOptions1] = useState(null);
  const [selectedprice, setSelectedprice] = useState(0);
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
    dispatch(
      shipmethod({
        url: 'fetch-shipment-method',
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
    data2 != undefined || data2 != null
      ? data2?.map((item, index) => {
          const pri = item?.subtotal.replace(/\$/g, '');
          total = total + parseInt(pri);
        })
      : null;

    return total;
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

  const toggleSelection1 = optionId => {
    setSelectedprice(optionId?.price);
    setSelectedOptions1(optionId?.shipping_meyhod_id);
  };

  useEffect(() => {
    setSelectedOptions(null);
  }, []);
  const [tranc, setTrans] = useState('');
  const toggleSelection = optionId => {
    setSelectedOptions(optionId);
    // setSelectedOptions(prev => ({
    //   ...prev,
    //   [optionId]: !prev[optionId],
    // }));
  };

  const Createorder1 = async () => {
    var options = {
      description: 'Credits towards consultation',
      // image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_nS7mvhlfOHnGbx',
      amount: '5000',
      // name: 'OpenCart',
      prefill: {
        email: 'rohansahusahi@example.com',
        contact: '9191919191',
        name: 'Razorpay Software',
      },
      theme: {color: '#FFDE4D'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // setTrans(data.razorpay_payment_id);
        createto(data);
      })
      .catch(error => {
        // handle failure
        console.log(`Error: ${error.code} | ${error.description}`);
      });
  };

  const createto = async item => {
    setTrans(item.razorpay_payment_id);
    createbyord();
  };

  const data1 = {
    shipping_option: selectedOptions1,
    shipping_method: 'default',
    shipping_amount: selectedprice,
    coupon_code: '',
    address: {
      address_id: getitem?.adress?.id ?? '',
      name: getitem?.adress?.name ?? '',
      email: getitem?.adress?.email ?? '',
      phone: getitem?.adress?.phone ?? '',
      country: getitem?.adress?.country ?? '',
      state: getitem?.adress?.state ?? '',
      city: getitem?.adress?.city ?? '',
      address: getitem?.adress?.address ?? '',
    },
    amount: Number(totalAmount2()) + Number(selectedprice),
    currency: 'USD',
    customer_id: getitem?.adress?.customer_id,
    customer_type: 'Botble\\Ecommerce\\Models\\Customer',
    payment_method: selectedOptions == 1 ? 'cod' : '',
    payment_status: 'pending',
    description: 'testing perpose',
    tax_information: {
      company_name: '',
      company_address: '',
      company_tax_code: '',
      company_email: '',
    },

    user_id: JSON.parse(getitem?.adress?.customer_id),
    transaction_id: selectedOptions == 2 ? tranc : '',

  };
  const createbyord = async () => {
    try {
      setLoading(true);
      // Convert the dynamic object to a JSO stringN
      const jsonData = JSON.stringify(data1);
      const token = await AsyncStorage.getItem('Token');
      console.log('hghghh', jsonData);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://ecom.craftsweb.co.in/public/api/v1/create-customer-order',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: jsonData,
      };

      const response = await axios.request(config);
      if (response.data.status == 200) {
        setLoading(false);
        Toast.show(response.data.msg);
        navigation.navigate('Ordersucces');
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log('Response data ererrer:', error.response.data);
        console.log('Response status sfgsfg:', error.response.status);
        console.log('Response headers:', error.response.headers);
      } else if (error.request) {
        console.log('Request made but no response received:', error.request);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  const Createorder32 = () => {
    if (selectedOptions === 1) {
      createbyord();
    } else if (selectedOptions === 2) {
      Createorder1();
    }
  };

  const renderItem = ({item}) => (
    <View
      style={{
        borderWidth: 0.5,
        borderRadius: 5,
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row',
      }}>
      <View
        style={{
          // backgroundColor: 'green',
          alignItems: 'center',
          justifyContent: 'center',
          height: 25,
          width: 25,
          borderRadius: 12.5,
        }}>
        <CustomCheckbox
          isSelected={selectedOptions1 === item?.shipping_meyhod_id} // Check if this item is selected
          onToggle={() => toggleSelection1(item)}
        />
      </View>
      <View style={{marginLeft: 10}}>
        <Text style={{fontSize: 15, 
          fontfamily:'MUlish-SemiBold', color: 'black'}}>
          {item.name} --{' '}
          <Text style={{fontSize: 15, fontWeight: '700', color: 'black'}}>
            {item.price === '0.00' ? 'Free shipping' : `₹${item.price}`}
          </Text>
        </Text>
      </View>
    </View>
  );
  const removeHtmlTags = str => {
    return str?.replace(/<\/?[^>]+(>|$)/g, '');
  };
  return (
    <View style={{flex: 1, backgroundColor:"#FCE7C8"}}>
      <View style={styles.header}>
        <View style={styles.back}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={wp(5.9)}
            color="#000000"
          />
          <Text style={{fontSize: wp(4), color: '#000000', marginLeft: wp(5), width:wp(90), fontFamily:'Mulish-Bold'}}>
            Shipping Method
          </Text>
        </View>
      </View>
      <View>
        {loader || load || loading1 ? <Loader /> : null}
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: hp(10),  padding:wp(2)}}>
          <FlatList
            data={data2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View style={[styles.listContainer, { paddingHorizontal: wp(2) }]}>
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
                      fontFamily:"Mulish-SemiBold",
                      width: '90%',
                      color:'#000000'
                    }}>
                   {removeHtmlTags(item.name)
                          ?.split('\n')
                          .filter(line => line.trim())[0]
                          ?.substring(0, 30)}{' '}
                        ...
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: wp(1),
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: wp(3.5), fontWeight: '600', 
                      fontFamily:"Mulish-SemiBold",}}>
                      Base price:
                    </Text>
                    <Text
                      style={{
                      
                        color: 'black',
                        fontSize: wp(3.5),
                        fontFamily:"Mulish-SemiBold",
                        marginLeft: 5,
                        // textDecorationLine: 'line-through',
                      }}>
                      ₹ {item?.price}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      cartRemove(item);
                    }}
                    style={{
                      position: 'absolute',
                      top: -65,

                      right: -5,
                      height: hp(4),
                      width: wp(8),
                      alignItems: 'center',
                    }}>
                    {/* <Text style={{fontSize: wp(4), color: 'grey'}}>X</Text> */}
                    <AntDesign name="delete" size={wp(5)} color="#ff0000" />
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: wp(1),
                      alignItems: 'center',
                    }}>
                    <Text style={{ fontSize: wp(3.5),
                      fontFamily:"Mulish-SemiBold",}}>
                      Subtotal:
                    </Text>

                    <Text
                      style={{
                       
                        color: 'black',
                        fontSize: wp(3.5),
                        fontFamily:"Mulish-SemiBold",
                        marginLeft: 5,
                      }}>
                      ₹ {item.subtotal}
                    </Text>
                  </View>
                  <Text style={{marginLeft: '1%', color: 'grey',  fontSize: wp(3.5),
                      fontFamily:"Mulish-SemiBold",}}>
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
              </View>
            )}
          />

          {data2.length == 0 ? null : (
            <View style={{padding: 20}}>
              <Text style={{fontSize: 20, fontfamily:'Mulish-Bold'}}>
                Total Amount: ₹{' '}
                {`${(
                  parseFloat(totalAmount2()) + parseFloat(selectedprice)
                )?.toFixed(2)}`}
              </Text>
            </View>
          )}

          <Text
            style={{
              fontSize: 20,
              marginLeft: 10,
              marginVertical: 10,
              color: '#000000',
              fontWeight: '700',
            }}>
            Shipping method
          </Text>
          <FlatList
            data={data?.shipping_method}
            keyExtractor={item => item?.shipping_meyhod_id?.toString()}
            renderItem={renderItem}
          />

          <Text
            style={{
              fontSize: 20,
              marginLeft: 10,
              marginVertical: 10,
              fontWeight: '700',
              color: '#000000',
            }}>
            Payment method
          </Text>
          <View
            style={{
              borderWidth: 0.5,
              borderRadius: 5,
              alignItems: 'center',
              padding: 10,
              flexDirection: 'row',
            }}>
            <View
              style={{
                // backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
                height: 25,
                width: 25,
                borderRadius: 12.5,
              }}>
              <CustomCheckbox
                isSelected={selectedOptions == 1} // Convert state to boolean
                onToggle={() => toggleSelection(1)}
              />
            </View>
            <View style={{marginLeft: 10}}>
              {/* <Text style={{fontSize: 17, fontWeight: '700', color: '#50781c'}}>
              Day of Delivery speed{' '}
            </Text> */}
              <Text style={{fontSize: 15, fontWeight: '400', color: 'black'}}>
                Cash on delivery{'(COD)'}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderRadius: 5,
              alignItems: 'center',
              padding: 10,
              flexDirection: 'row',
            }}>
            <View
              style={{
                // backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
                height: 25,
                width: 25,
                borderRadius: 12.5,
              }}>
              <CustomCheckbox
                isSelected={selectedOptions == 2} // Convert state to boolean
                onToggle={() => toggleSelection(2)}
              />
            </View>
            <View style={{marginLeft: 10}}>
              {/* <Text style={{fontSize: 17, fontWeight: '700', color: '#50781c'}}>
              Day of Delivery speed{' '}
            </Text> */}
              <Text style={{fontSize: 15, fontWeight: '400', color: 'black'}}>
                Bank transfer
              </Text>
              <Text>please send money to our bank account :ACB 6927021319</Text>
            </View>
          </View>

          <TouchableOpacity
            disabled={!selectedOptions}
            onPress={() => {
              Createorder32();
              // createbyord()
            }}
            style={{
              marginTop: '3%',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 10,
              marginHorizontal: wp(6.5),
              backgroundColor: '#FFDE4D',
              // backgroundColor: selectedId==null?'grey':'#FFDE4D',
              borderRadius: 5,
              paddingHorizontal: 10,
            }}>
            {/* // style={{
            //   backgroundColor: 'orange',
            //   borderRadius: 10,
            //   marginTop: 10,
            //   marginHorizontal: 30,
            //   padding: 10,
            //   alignItems: 'center',
            // }}> */}
            <Text style={{fontSize:wp(4),fontFamily:'Mulish-SemiBold',color:'#000000'}}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
