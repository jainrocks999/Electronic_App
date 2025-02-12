import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {orderDetail, orderlistapi} from '../../../redux/slice/orderSclice';
import Loader from '../../../compoents/Loader';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {Products} from '../../../data/Products';

const OrderList = ({navigation}) => {
  const product = useSelector(state => state?.order?.orderList1?.data);
  const loading1 = useSelector(state => state?.order?.loading);

  const focus = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (focus) {
      apicall();
    }
  }, [focus]);

  const apicall = async () => {
    try {
      // Retrieve token and user_id from AsyncStorage
      const token = await AsyncStorage.getItem('Token');
      const userid = await AsyncStorage.getItem('user_id');

      if (!token || !userid) {
        console.error('Token or User ID is missing.');
        return;
      }

      await dispatch(
        orderlistapi({id: userid, token: token, url: 'fetch-order'}),
      );
    } catch (error) {
      console.error('Error in API call:', error);
    }
  };

  const OrderDetails = async item => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    await dispatch(
      orderDetail({
        id: userid,
        token: token,
        url: 'fetch-order-details',
        orderid: item.id,
        code: item?.code,
        navigation,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={wp(5)}
            color="#000000"
          />
          <Text style={styles.txt}>{'   '}My Orders</Text>
        </View>
      </View>
      {loading1 ? <Loader /> : null}
      {product?.length == 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>{'No order found'}</Text>
        </View>
      ) : (
        <FlatList
          data={product}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => {
            return (
              <View style={styles.listCard}>
                {/* <Image style={styles.img} source={item.image} /> */}
                <View style={{height: hp(12), marginLeft: wp(1)}}>
                  <Text style={{fontWeight: '500', fontSize: wp(4)}}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      marginVertical: wp(1),
                      fontSize: wp(4),
                      fontWeight: '500',
                      color: 'black',
                    }}>
                    ORDER ID :{' '}
                    <Text style={{fontWeight: '300'}}>{item.code}</Text>
                  </Text>
                  <Text
                    style={{
                      fontSize: wp(4),
                      fontWeight: '500',
                      color: 'black',
                    }}>
                    STATUS :{' '}
                    <Text style={{fontWeight: '300'}}>
                      {item?.status?.value}
                    </Text>
                  </Text>
                  <Text
                    style={{fontSize: wp(4), color: '#000000', marginTop: wp(3), fontFamily:'Mulish-Bold'}}>
                    ₹{item?.amount}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => OrderDetails(item)}
                  style={{
                    height: hp(4),
                    width: wp(32),
                    backgroundColor: '#FFDE4D',
                    position: 'absolute',
                    right: wp(5),
                    bottom: wp(5),
                    borderRadius: wp(1),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontFamily:'Mulish-Bold', color: '#000000', fontSize:wp(2.5)}}>
                    ORDER DETAILS
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default OrderList;
