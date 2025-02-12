import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; // For responsive UI
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../../../compoents/Loader';
import Imagepath from '../../../compoents/Imagepath';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {cancelorders, orderDetail} from '../../../redux/slice/orderSclice';
const OrderDetailsScreen = ({route, navigation}) => {
  const data = useSelector(state => state?.order?.orderD);
  const loading1 = useSelector(state => state?.order?.loading);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const formatDate = dateString => {
    const date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return `${day}/${month}/${year}`;
  };
  useEffect(() => {
    setVisible(false);
  }, []);
  const cancelorder = async () => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    let data2 = {
      user_id: userid,
      order_id: JSON.stringify(data.id),
      order_number: data.code,
      description: name,
    };

    setVisible(false);

    await dispatch(
      cancelorders({
        token: token,
        url: 'cancel-customer-order',
        data1: data2,
        navigation,
      }),
    );
    OrderDetails();
  };

  const OrderDetails = async item => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    await dispatch(
      orderDetail({
        id: userid,
        token: token,
        url: 'fetch-order-details',
        orderid: JSON.stringify(data.id),
        code: data.code,
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
          <Text style={styles.txt}>{'   '}Order Detail</Text>
        </View>
      </View>
      {loading1 ? <Loader /> : null}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={{flex: 1}}>
          {data?.products?.length == 0 ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>Your cart is empty</Text>
            </View>
          ) : (
            <>
              <FlatList
                data={data?.products}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View style={styles.listContainer}>
                    <View style={styles.imgContainer}>
                      <TouchableOpacity
                      // onPress={() =>handleDetail(item)}
                      >
                        <Image
                          style={styles.img}
                          source={{
                            uri: `${Imagepath.Path}${item.product_image}`,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.itemContainer}>
                      <Text
                        style={{
                          marginTop: '4%',
                          fontSize: wp(3.5),
                          color:'#000000',
                         fontFamily:'Mulish-SemiBold',
                          width: '90%',
                        }}>
                        {item.product_name}
                      </Text>
                      <View
                        style={{flexDirection: 'row', marginVertical: wp(1)}}>
                        <Text
                          style={{
                            marginTop: '2%',
                            fontFamily:'Mulish-SemiBold',
                            color: 'black',
                            fontSize: wp(4),
                          }}>
                          {item.subtotal}
                        </Text>
                        <Text
                          style={{
                            marginTop: '2%',
                            fontFamily:'Mulish-SemiBold',
                            color: 'grey',
                            fontSize: wp(4),
                            // marginLeft: '5%',
                            // textDecorationLine: 'line-through',
                          }}>
                          ₹ {item?.price}
                        </Text>
                      </View>
                      {/* <Text style={{ marginLeft: '3%', color: 'grey' }}>
                    14 days return policy
                  </Text> */}
                      <View
                        style={{
                          flexDirection: 'row',
                          height: hp(5),
                          width: '90%',
                          justifyContent: 'space-between',
                          // alignItems: 'center',
                          // marginVertical: wp(3),
                        }}>
                        <Text style={{fontSize: wp(4), fontFamily:'Mulish-SemiBold',}}>
                          {'product Quantity: '}
                        </Text>
                        <Text style={{fontSize: wp(4), fontFamily:'Mulish-SemiBold',}}>
                          {item.qty}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            </>
          )}
        </View>

        {visible ? (
          <View>
            <Text style={styles.modalTitle}>Description</Text>

            <TextInput
              style={styles.input}
              placeholder="Description"
              value={name}
              onChangeText={setName}
            />
          </View>
        ) : null}

        {data.status?.label == 'Processing' ? (
          <TouchableOpacity
            style={[styles.btn3, {height: hp(5), width: wp(33)}]}
            onPress={() => {
              visible ? cancelorder() : setVisible(true);
            }}>
            <Text style={{fontSize: wp(4), fontFamily:'Mulish-SemiBold', color: '000000'}}>
              Cancel order
            </Text>
          </TouchableOpacity>
        ) : null}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Order Code:</Text>
          <Text style={styles.value}>{data.code}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{data.status?.label}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>₹ {data?.amount}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Shipping Amount:</Text>
          <Text style={styles.value}>₹ {data?.shipping_amount}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Discount:</Text>
          <Text style={styles.value}>₹ {data?.discount_amount}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Created At:</Text>
          <Text style={styles.value}> {formatDate(data?.created_at)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Shipping Method:</Text>
          <Text style={styles.value}>{data.shipping_method?.label}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Is Confirmed:</Text>
          <Text style={styles.value}>{data.is_confirmed ? 'Yes' : 'No'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Is Finished:</Text>
          <Text style={styles.value}>{data.is_finished ? 'Yes' : 'No'}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetailsScreen;
