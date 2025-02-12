import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
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
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../compoents/Loader';
import {editprofile, resetApiState} from '../../../redux/slice/AddressSclice';
const Profile = () => {
  const [show, setShow] = useState({
    acount: false,
    payment: false,
  });
  const navigation = useNavigation();
  const onHandleList = (name, value) => {
    setShow(prevState => ({...prevState, [name]: value}));
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState(new Date());

  const isLoading = useSelector(state => state.address?.loading);
  const profile = useSelector(state => state.address?.updatepro?.data);
  const profile1 = useSelector(state => state.address?.profile);
  const formatDate = dob => {
    const date = new Date(dob);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    setDate(date);
    return `${day}-${month}-${year}`; // Format as dd-mm-yyyy
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (modalVisible) {
      setName(profile1?.name);
      const dob = profile1?.dob ? formatDate(profile1.dob) : '';
      setDob(dob);
      setMobile(profile1?.phone);
    }
  }, [modalVisible]);

  useEffect(() => {
    if (profile) {
      setModalVisible(false);
      dispatch(resetApiState()); // Reset state after closing the modal
    }
  }, [profile, dispatch]);

  const Profileupdate = async () => {
    setModalVisible(true);
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    let data = {
      name: name,
      phone: mobile,
      dob: dob,
      user_id: userid,
    };

    await dispatch(
      editprofile({
        data,
        token: token,
        url: 'profile-update',
      }),
    );
  };

  const Logout = () => {
    Alert.alert(
      'Are you sure you want to log out?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {
            cancelable: false;
          },
          style: 'cancel',
        },
        {text: 'ok', onPress: () => LogoutApp()},
      ],
      {cancelable: false},
    );
  };
  const LogoutApp = async () => {
    await AsyncStorage.setItem('Token', '');

    AsyncStorage.clear();
    navigation.navigate('Login', {data: true});
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
        name: 'Developer',
      },
      theme: {color: '#FFDE4D'},
    };

    RazorpayCheckout.open(options)
      .then(data => {
        console.log('rojar  pay to add the data ', data);

        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        console.log('rojar  pay to add the error ', error);
        // alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FCE7C8'}}>
      {isLoading ? <Loader /> : null}
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
          <Text style={styles.txt}>Profile</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: '#FCE7C8',
          flex: 1,
          paddingBottom: hp(2),
        }}>
        <View style={styles.container1}>
          <Text
            style={{
              fontSize: wp(5),
              fontWeight: '500',
              color: 'black',
            }}>
            {profile1 ? `Hello, ${profile1?.name}` : `Hello, ${profile?.name}`}
          </Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <EvilIcons name="pencil" size={wp(10)} color="black" />
          </TouchableOpacity>
        </View>

        <View style={[styles.listContainer, {marginTop: wp(3)}]}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => onHandleList('payment', !show.payment)}
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
              <View
              // onPress={() => onHandleList('payment', !show.payment)}
              >
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
              </View>
            </View>
            <Entypo
              name={show.payment ? 'chevron-small-up' : 'chevron-small-down'}
              style={{alignSelf: 'center', fontSize: wp(8), color: 'grey'}}
            />
          </TouchableOpacity>
          {show.payment ? (
            <View style={[styles.HideView, {width: '90%', marginLeft: wp(8)}]}>
              <TouchableOpacity
                onPress={() => startPayment()}
                style={styles.btn2}>
                <View
                  style={{
                    height: hp(4.8),
                    width: hp(4.8),
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
          <TouchableOpacity
            onPress={() => onHandleList('acount', !show.acount)}
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                style={{marginTop: -wp(4)}}
              />
              <View>
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
              </View>
            </View>
            <Entypo
              name={show.acount ? 'chevron-small-up' : 'chevron-small-down'}
              style={{alignSelf: 'center', fontSize: wp(8), color: 'grey'}}
            />
          </TouchableOpacity>
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
                // onPress={() => {
                onPress={() => navigation.navigate('Shipping')}
                // navigation.navigate('Myaddress');
                // }}
                style={styles.btn2}>
                <View
                  style={{
                    height: hp(4.8),
                    width: hp(4.8),
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
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  flexDirection: 'row',
                  height: hp(5),
                  alignItems: 'center',
                  // justifyContent: 'space-between',
                  marginTop: wp(2),
                }}>
                <AntDesign
                  name="hearto"
                  size={wp(5)}
                  style={{marginTop: -wp(4)}}
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
            </View>
          </TouchableOpacity>
        </View>

        {/* <View style={[styles.listContainer]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                style={{marginTop: -wp(4)}}
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
              style={{alignSelf: 'center', fontSize: wp(8), color: 'grey'}}
            />
          </View>
        </View> */}

        <View style={styles.cardContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('contactus')}
              style={[styles.touchBtn, {paddingLeft: wp(2)}]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Check name="headset" size={wp(6)} />
                <Text
                  style={{
                    fontSize: wp(3.5),
                    fontFamily:'Mulish-Bold',
                    marginLeft: wp(2),
                    color:'#000000'
                  }}>
                  Contact Us
                </Text>
              </View>
              <Entypo name="chevron-small-right" size={wp(6)} />
            </TouchableOpacity>
            <TouchableOpacity
             onPress={() => navigation.navigate('about')}
            style={styles.touchBtn}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign name="idcard" size={wp(6)} />
                <Text
                  style={{
                    fontSize: wp(3.5),
                    fontFamily:'Mulish-Bold',
                    marginLeft: wp(2),
                    color:'#000000'
                  }}>
                  {' '}
                  About Us
                </Text>
              </View>
              <Entypo name="chevron-small-right" size={wp(6)} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <TouchableOpacity 
             onPress={() => navigation.navigate('Faq')}
            style={[styles.touchBtn, {paddingLeft: wp(2)}]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Check name="headset" size={wp(6)} />
                <Text
                  style={{
                    fontSize: wp(3.5),
                    fontFamily:'Mulish-Bold',
                    marginLeft: wp(2),
                    color:'#000000'
                  }}>
                  FAQs
                </Text>
              </View>
              <Entypo name="chevron-small-right" size={wp(6)} />
            </TouchableOpacity>
            <TouchableOpacity 
            
            onPress={() => navigation.navigate('career')}
            
            style={styles.touchBtn}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign name="idcard" size={wp(6)} />
                <Text
                  style={{
                    fontSize: wp(3.5),
                    fontFamily:'Mulish-Bold',
                      color:'#000000',
                    marginLeft: wp(2),

                  }}>
                  {' '}
                  Career
                </Text>
              </View>
              <Entypo name="chevron-small-right" size={wp(6)} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <TouchableOpacity 
            
            onPress={() => navigation.navigate('Terms')}
            style={[styles.touchBtn, {paddingLeft: wp(1)}]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: wp(4.4),
                    fontSize: wp(3.5),
                    fontFamily:'Mulish-Bold',
                      color:'#000000',
                  }}>
                 Terms & Conditions
                </Text>
              </View>
              <Entypo name="chevron-small-right" size={wp(6)} />
            </TouchableOpacity>
            <TouchableOpacity
             onPress={() => navigation.navigate('privacy')}
            style={styles.touchBtn}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: wp(4.5),
                    fontSize: wp(3.5),
                    fontFamily:'Mulish-Bold',
                      color:'#000000',
                  }}>
                  {' '}
                  Privacy Refund
                </Text>
              </View>
              <Entypo name="chevron-small-right" size={wp(6)} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            Logout();
          }}>
          <Text style={{fontSize: wp(5),   fontFamily:'Mulish-Bold', color:'#000000',}}>
            LOG OUT
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        {isLoading ? <Loader /> : null}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Close Icon */}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={[styles.closeButton, {zIndex: 10}]}>
              <Text style={{fontSize: wp(4.5), color: 'grey'}}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Enter Details</Text>

            {/* Name Field */}
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              value={name}
              onChangeText={setName}
            />

            {/* Date of Birth Field */}

            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={[
                styles.inputcontainer,
                {alignItems: 'center'},
                {
                  height: 55,
                  borderRadius: 5,
                  marginTop: 10,
                  flexDirection: 'row',
                  width: '100%',
                  paddingHorizontal: 5,
                  borderWidth: 0.5,
                },
              ]}>
              <View style={{marginTop: 0}}>
                <AntDesign size={18} name="calendar" color={'red'} />
              </View>
              <Text style={{color: '#000', marginLeft: wp(2)}}>
                {dob ? dob : 'dd-mm-yyyy'}
              </Text>
            </TouchableOpacity>

            {/* <TextInput
              style={styles.input}
              placeholder="Enter DOB (YYYY-MM-DD)"
              value={dob}
              onChangeText={setDob}
              keyboardType="numeric"
            /> */}

            {/* Mobile Number Field */}
            <TextInput
              style={styles.input}
              placeholder="Enter Mobile Number"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
              maxLength={10}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                Profileupdate();
              }}>
              <Text style={styles.submitButtonText}>Update Profile</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <DatePicker
        modal
        open={open}
        date={date}
        mode={'date'}
        maximumDate={new Date()}
        onConfirm={selectedDate => {
          setOpen(false);
          const day = String(selectedDate.getDate()).padStart(2, '0');
          const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
          const year = selectedDate.getFullYear();

          const formattedDate = `${day}-${month}-${year}`;
          setDob(formattedDate);
          setDate(selectedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      {/* <BottumTab /> */}
    </View>
  );
};
export default Profile;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     width: '90%',
//     padding: 20,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginVertical: 5,
//   },
//   closeButton: {
//     marginTop: 15,
//     backgroundColor: '#2196F3',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });
