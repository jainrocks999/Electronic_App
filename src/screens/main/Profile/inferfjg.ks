import React, { useState } from 'react';
import { FlatList, Image, ScrollView, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import BottumTab from '../../../compoents/BottumTab';
import Check from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import RazorpayCheckout from 'react-native-razorpay';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Cat from '../../../data/Cat';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Profile = () => {
  const [show, setShow] = useState({
    acount: false,
    payment: false,
  });
  const navigation = useNavigation();
  const onHandleList = (name, value) => {
    setShow(prevState => ({ ...prevState, [name]: value }));
  };












  const startPayment = () => {
    var options = {
      description: 'Test Payment',
      image: 'https://yourlogo.com/logo.png',
      currency: 'INR', 
      key: 'rzp_test_nS7mvhlfOHnGbx', 
      amount: '50000.00', 
      name: 'ElectronicShopApp',
      prefill: {
        email: 'test@example.com',
        contact: '9993820521',
        name: 'Developer'
      },
      theme: {color: '#FFDE4D'}
    };
  
    RazorpayCheckout.open(options).then((data) => {
     console.log('rojar  pay to add the data ',data);
     
      alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      console.log('rojar  pay to add the error ',error);
      // alert(`Error: ${error.code} | ${error.description}`);
    });
  };




  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <View style={{ flex: 1 }}>
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
              color="white"
            />
            <Text style={styles.txt}>Profile</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ backgroundColor: '#f2f5f4' }}>
          <View style={styles.container}>
            <Text
              style={{
                fontSize: wp(5),
                fontWeight: '500',
                color: 'black',
              }}>
              Hello , Harsh
            </Text>

            <EvilIcons name="pencil" size={wp(10)} color="black" />
          </View>
          {/* <View
          style={{backgroundColor:'#f2f5f4', height: hp(8), marginTop: wp(3)}}>
          <FlatList
            data={Cat}
            keyExtractor={(item, index) => index}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View style={styles.cat}>
                  <Text style={{fontSize: wp(4), color: 'black'}}>
                    {item.name}
                  </Text>
                  <Entypo name="chevron-small-right" size={wp(5)}/>
                </View>
              );
            }}
          />
          </View> */}




           <View style={[styles.listContainer, {marginTop: wp(3)}]}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  flexDirection: 'row',
                  height: hp(5),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: wp(1.2),
                }}>
                <FontAwesome
                  name="payment"
                  size={wp(5)}
                  style={{marginTop: -wp(4)}}
                />
                <TouchableOpacity
                  onPress={() => onHandleList('payment', !show.payment)}>
                  <Text
                    style={{
                      marginLeft: wp(3),
                      fontSize: wp(4),
                      fontWeight: '500',
                      color: 'black',
                    }}>
                    payment & Currencies
                  </Text>
                  <Text
                    style={{
                      marginLeft: wp(3),
                      marginTop: wp(1),
                      fontSize: wp(3),
                    }}>
                    View payment methods and currency option
                  </Text>
                </TouchableOpacity>
              </View>
              <Entypo
                name={show.payment ? 'chevron-small-up' : 'chevron-small-down'}
                style={{alignSelf: 'center', fontSize: wp(8), color: 'grey'}}
              />
            </View>
            {show.payment ? (
              <View
                style={[styles.HideView, {width: '85%', marginLeft: wp(8)}]}>
                <TouchableOpacity onPress={()=>startPayment()} style={styles.btn2}>
                  <View
                    style={{
                      height: hp(4.8),
                      width: hp(4.8),
                      //borderWidth: 1,
                      borderRadius: hp(2.8),
                      backgroundColor: 'pink',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: wp(1),
                    }}>
                    <AntDesign name="creditcard" size={wp(5)} color="black" />
                  </View>
                  <Text
                    style={{
                      fontSize: wp(2.5),
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    Saved Cards
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn2}>
                  <View
                    style={{
                      height: hp(4.8),
                      width: hp(4.8),
                      //borderWidth: 1,
                      borderRadius: hp(2.8),
                      backgroundColor: 'lightgrey',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: wp(1),
                    }}>
                    <FontAwesome name="payments" size={wp(5)} />
                  </View>
                  <Text
                    style={{
                      fontSize: wp(2.5),
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    UPI
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn2}>
                  <View
                    style={{
                      height: hp(4.8),
                      width: hp(4.8),
                      //borderWidth: 1,
                      borderRadius: hp(2.8),
                      backgroundColor: '#e6f0f2',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: wp(1),
                    }}>
                    <MaterialCommunityIcons
                      name="currency-brl"
                      size={wp(5)}
                      color="black"
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: wp(2.5),
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    Currencies
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
               </View> 
          <View style={[styles.listContainer]}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View
                style={{
                  flexDirection: 'row',
                  height: hp(5),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: wp(2),
                }}>
                <MaterialIcons
                  name="pencil-square-o"
                  size={wp(5)}
                  style={{ marginTop: -wp(4) }}
                />
                <TouchableOpacity
                  onPress={() => onHandleList('acount', !show.acount)}>
                  <Text
                    style={{
                      marginLeft: wp(3),
                      fontSize: wp(4),
                      fontWeight: '500',
                      color: 'black',
                    }}>
                    Manage Account
                  </Text>
                  <Text
                    style={{
                      marginLeft: wp(3),
                      marginTop: wp(1),
                      fontSize: wp(3),
                    }}>
                    Your account details & saved address
                  </Text>
                </TouchableOpacity>
              </View>
              <Entypo
                name={show.acount ? 'chevron-small-up' : 'chevron-small-down'}
                style={{ alignSelf: 'center', fontSize: wp(8), color: 'grey' }}
              />
            </View>
            {show.acount ? (
              <View style={styles.HideView}>
                <TouchableOpacity style={styles.btn2}>
                  <View
                    style={{
                      height: hp(4.8),
                      width: hp(4.8),
                      //borderWidth: 1,
                      borderRadius: hp(2.8),
                      backgroundColor: 'pink',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: wp(1),
                    }}>
                    <AntDesign name="idcard" size={wp(5)} color="black" />
                  </View>
                  <Text
                    style={{
                      fontSize: wp(2.5),
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    Account Details
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity

                  onPress={() => {
                    navigation.navigate('Myaddress')
                  }}

                  style={styles.btn2}>
                  <View
                    style={{
                      height: hp(4.8),
                      width: hp(4.8),
                      //borderWidth: 1,
                      borderRadius: hp(2.8),
                      backgroundColor: '#e6f0f2',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: wp(1),
                    }}>
                    <Entypo name="location" size={wp(5)} color="black" />
                  </View>
                  <Text
                    style={{
                      fontSize: wp(2.5),
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    Addresses
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <View style={[styles.listContainer]}>
            <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: hp(5),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: wp(2),
                  }}>
                  <AntDesign
                    name="hearto"
                    size={wp(5)}
                    style={{ marginTop: -wp(4) }}
                  />
                  <View>
                    <Text
                      style={{
                        marginLeft: wp(3),
                        fontSize: wp(4),
                        fontWeight: '500',
                        color: 'black',
                      }}>
                      Wishlist
                    </Text>
                    <Text
                      style={{
                        marginLeft: wp(3),
                        marginTop: wp(1),
                        fontSize: wp(3),
                      }}>
                      Your most loved products
                    </Text>
                  </View>
                </View>
                {/* <Entypo
                name={'chevron-small-down'}
                style={{alignSelf: 'center', fontSize: wp(8), color: 'grey'}}
              /> */}
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.listContainer]}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View
                style={{
                  flexDirection: 'row',
                  height: hp(5),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: wp(2),
                }}>
                <AntDesign
                  name="setting"
                  size={wp(5)}
                  style={{ marginTop: -wp(4) }}
                />
                <View>
                  <Text
                    style={{
                      marginLeft: wp(3),
                      fontSize: wp(4),
                      fontWeight: '500',
                      color: 'black',
                    }}>
                    Settings
                  </Text>
                  <Text
                    style={{
                      marginLeft: wp(3),
                      marginTop: wp(1),
                      fontSize: wp(3),
                    }}>
                    Manage notification and more...
                  </Text>
                </View>
              </View>
              <Entypo
                name="chevron-small-down"
                style={{ alignSelf: 'center', fontSize: wp(8), color: 'grey' }}
              />
            </View>
          </View>
          <View style={styles.cardContainer}>
            {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
              style={styles.touchBtn}
              onPress={() => navigation.navigate('OrderList')}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Check name="sticker-check-outline" size={wp(6)} />
                <Text
                  style={{
                    fontSize: wp(5),
                    fontWeight: '400',
                    marginLeft: wp(2),
                  }}>
                  {' '}
                  Orders
                </Text>
              </View>
              <Entypo name="chevron-small-right" size={wp(6)}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchBtn}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons name="undo" size={wp(5)} />
                <Text
                  style={{
                    fontSize: wp(5),
                    fontWeight: '400',
                    marginLeft: wp(2),
                  }}>
                  {' '}
                  Returns
                </Text>
              </View>
              <Entypo name="chevron-small-right" size={wp(6)} />
              </TouchableOpacity>
              </View>  */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,marginTop: 10}}>
              <TouchableOpacity style={[styles.touchBtn, { paddingLeft: wp(2) }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Check name="headset" size={wp(6)} />
                  <Text
                    style={{
                      fontSize: wp(5),
                      fontWeight: '400',
                      marginLeft: wp(2),
                    }}>
                    Contact Us
                  </Text>
                </View>
                <Entypo name="chevron-small-right" size={wp(6)} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchBtn}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AntDesign name="idcard" size={wp(6)} />
                  <Text
                    style={{
                      fontSize: wp(5),
                      fontWeight: '400',
                      marginLeft: wp(2),
                    }}>
                    {' '}
                    Career
                  </Text>
                </View>
                <Entypo name="chevron-small-right" size={wp(6)} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <TouchableOpacity style={[styles.touchBtn, { paddingLeft: wp(2) }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Check name="headset" size={wp(6)} />
                  <Text
                    style={{
                      fontSize: wp(5),
                      fontWeight: '400',
                      marginLeft: wp(2),
                    }}>
                    FAQs
                  </Text>
                </View>
                <Entypo name="chevron-small-right" size={wp(6)} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchBtn}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AntDesign name="idcard" size={wp(6)} />
                  <Text
                    style={{
                      fontSize: wp(5),
                      fontWeight: '400',
                      marginLeft: wp(2),
                    }}>
                    {' '}
                   About Us
                  </Text>
                </View>
                <Entypo name="chevron-small-right" size={wp(6)} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <TouchableOpacity style={[styles.touchBtn, { paddingLeft: wp(2) }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                 
                  <Text
                    style={{
                      fontSize: wp(5),
                      fontWeight: '400',
                      marginLeft: wp(2),
                    }}>
          Terms Of Use
                  </Text>
                </View>
                <Entypo name="chevron-small-right" size={wp(6)} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchBtn}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               
                  <Text
                    style={{
                      fontSize: wp(5),
                      fontWeight: '400',
                      marginLeft: wp(2),
                    }}>
                    {' '}
                  Privacy Policy
                  </Text>
                </View>
                <Entypo name="chevron-small-right" size={wp(6)} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btn} onPress={async () => {
              await AsyncStorage.clear();
              navigation.navigate('Login')
            }}>
              <Text style={{ fontSize: wp(5), fontWeight: 'bold', color: 'white' }}>
                LOG OUT
              </Text>
            </TouchableOpacity>
          </View>


        </View>
      </View>
      <BottumTab />
    </View>
  );
};
export default Profile;
