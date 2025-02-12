import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from '../Cart/styles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../compoents/Loader';
import {getAddress, RemoveAddress} from '../../../redux/slice/AddressSclice';
import Toast from 'react-native-simple-toast';

const ShippingAddressPage = ({route}) => {
  const item = route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.address.loading);
  const addresstoget = useSelector(state => state.address.getaData?.data);
  const [selectedId, setSelectedId] = useState(null);
  const [adrs, setAdrss] = useState(null);
  const focus = useIsFocused();
  useEffect(() => {
    setAdrss(null);
    if (focus) {
      AddressList();
    }
  }, [focus]);
  const AddressList = async () => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    await dispatch(
      getAddress({
        user_id: userid,

        token: token,

        url: 'fetch-customer-address',
        // navigation,
      }),
    );
  };

  const cartRemove = async item => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');

    await dispatch(
      RemoveAddress({
        user_id: userid,
        customer: item.id,
        token: token,

        url: 'delete-customer-address',
        navigation,
      }),
    );
  };

  const handleSelect = item => {
    setAdrss(item);
    setSelectedId(item.id);
  };

  const apicall = async () => {
    if (selectedId == null) {
      Toast.show('Select any address');
    } else {
      navigation.navigate('Shippinmethod', {data: item, adress: adrs});
    }
  };

  return (
    <View style={{flex: 1, backgroundColor:"#FCE7C8"}}>
      {isLoading ? <Loader /> : null}
      <View style={styles.header}>
        <View style={styles.back}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={wp(5.9)}
            color="#000000"
          />
          <Text style={{fontSize: wp(4), color: '#000000', marginLeft: wp(5), width:'100%'}}>
            Shipping Address
          </Text>
        </View>
      </View>

      <View style={{marginVertical: 10}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Address', {data: true, item: {}});
          }}
          style={{
            marginTop: '3%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            marginHorizontal: wp(6.5),
            backgroundColor: '#FFDE4D',
            borderRadius: 5,
            paddingHorizontal: 10,
          }}>
          <Text style={{fontSize:wp(4), color: '#000000',fontFamily:'Mulish-Bold'}}>Add a new address</Text>
          <Text style={{fontSize: 15}}></Text>
          <AntDesign name="right" size={20} color={'#000000'} />
        </TouchableOpacity>
      </View>
      <View style={{}}>
        <FlatList
          data={addresstoget}
          scrollEnabled={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={{
                flex: 1,
                borderWidth: 1,
                marginHorizontal: 20,
                marginVertical: 5,
                padding: 10,
                borderRadius: 10,
                borderColor: item.id == selectedId ? 'green' : 'grey',
              }}>
              <TouchableOpacity
                onPress={() => {
                  cartRemove(item);
                }}
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  height: hp(4),
                  width: wp(8),
                  alignItems: 'center',
                }}>
               
                <Text style={{fontSize: wp(4), color: 'grey'}}>X</Text>
              </TouchableOpacity>

              <Text style={{fontWeight: '600', fontSize: 16}}>{item.name}</Text>
              <Text>{item.address}</Text>
              <Text>
                {item.city} {item.zip_code} {item.state}
              </Text>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>{item.country}</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Address', {data: false, item: item})
                  }
                  style={{
                    width: wp(8),
                    height: hp(3.3),
                  }}>
                  <Text style={{textDecorationLine: 'underline'}}>Edit</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={{heightL: hp(40)}} />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          // padding: 10,
        }}>
        <TouchableOpacity
          // disabled={selectedId==null}
          onPress={() => {
            apicall();

            // navigation.navigate('Shippinmethod',{data:item,adress:adrs})
          }}
          style={{
            marginTop: '3%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            marginHorizontal: wp(6.5),
            backgroundColor: '#FFDE4D',
            // backgroundColor: selectedId==null?'grey':'#FFDE4D',
            borderRadius: 5,
            paddingHorizontal: 10,
          }}>
          <Text style={{fontSize: wp(4),fontFamily:'Mulish-Bold', color: '#000000'}}>Continue to order</Text>
          <Text style={{fontSize: 15}}></Text>
          <AntDesign name="right" size={20} color={'#000000'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShippingAddressPage;
