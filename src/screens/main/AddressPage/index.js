import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import BottumTab from '../../../compoents/BottumTab';
import Loader from '../../../compoents/Loader';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {createAddress} from '../../../redux/slice/AddressSclice';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const Address = ({route}) => {
  const navigation = useNavigation();
  const item = route.params;
  const isLoading = useSelector(state => state.address.loading);

  const [FirstName, setFirstName] = useState('');
  const [email, setEmailID] = useState('');
  const [Address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [Pincode, setPincode] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState1] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    if (item.data === false && item.item) {
      setFirstName(item?.item?.name || '');
      setEmailID(item?.item?.email || '');
      setAddress(item?.item?.address || '');
      setPhone(item?.item?.phone || '');
      setCity(item?.item?.city || '');
      setPincode(item?.item?.zip_code || '');
      setCountry(item?.item?.country || '');
      setState1(item?.item?.state || '');
    }
  }, [item.data, item]);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    let valid = true;
    const validationErrors = {};

    // Validate First Name
    if (!FirstName.trim()) {
      validationErrors.firstName = 'Please enter your name';
      valid = false;
    } else if (FirstName.length < 3) {
      validationErrors.firstName = 'Name must be at least 3 characters long';
      valid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      validationErrors.email = 'Please enter your email';
      valid = false;
    } else if (!emailRegex.test(email)) {
      validationErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    // Validate Phone Number
    if (!phone.trim()) {
      validationErrors.phone = 'Please enter your phone number';
      valid = false;
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      validationErrors.phone = 'Phone number must be 10 digits';
      valid = false;
    }

    // Validate Address
    if (!Address.trim()) {
      validationErrors.address = 'Please enter your address';
      valid = false;
    } else if (Address.length < 10) {
      validationErrors.address = 'Address must be at least 10 characters';
      valid = false;
    }

    // Validate City
    if (!city.trim()) {
      validationErrors.city = 'Please enter your city';
      valid = false;
    }

    // Validate Pincode
    if (!Pincode.trim()) {
      validationErrors.pincode = 'Please enter your pincode';
      valid = false;
    } else if (!/^\d{6}$/.test(Pincode)) {
      validationErrors.pincode = 'Pincode must be 6 digits';
      valid = false;
    }

    // Validate Country
    if (!country.trim()) {
      validationErrors.country = 'Please enter your country';
      valid = false;
    }

    // Validate State
    if (!state.trim()) {
      validationErrors.state = 'Please enter your state';
      valid = false;
    }

    setErrors(validationErrors);
    return valid;
  };

  const handleOnSubmit = async () => {
    if (!validateFields()) {
      Toast.show('Please enter the valid details and try again');
      return;
    }

    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');

    if (!token || !userid) {
      Toast.show(' Token or User ID is missing');
      return;
    }

    const addressData = {
      name: FirstName,
      email,
      phone,
      address: Address,
      city,
      state,
      country,
      zip_code: Pincode,
      user_id: userid,
      is_default: item?.data == false ? '1' : '0',
      ...(item?.data == false && {customer_address_id: item?.item?.id}),
    };

    try {
      await dispatch(
        createAddress({
          url:
            item?.data == false
              ? 'update-customer-address'
              : 'create-customer-address',
          token,
          data: addressData,
          navigation,
        }),
      );
      // navigation.goBack();
    } catch (error) {
      console.error('Error saving address:', error);
      Toast.show('Failed to save address. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <View style={styles.header}>
        <View style={styles.back}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={wp(5.9)}
            color="#000000"
          />
          <Text style={{fontSize: wp(4.5), color: '#000000', fontFamily:'Mulish-Bold', marginLeft:wp(5)}}>Add Address</Text>
        </View>
      </View>
      {isLoading ? <Loader /> : null}
      <ScrollView style={{marginTop: 20, paddingBottom: hp(20)}}>
        <TextInput
          style={styles.inputfield}
          placeholder="Name"
          value={FirstName}
          onChangeText={setFirstName}
        />
        {errors.firstName && (
          <Text style={styles.errorText}>{errors.firstName}</Text>
        )}

        <TextInput
          style={styles.inputfield}
          placeholder="Email"
          value={email}
          onChangeText={setEmailID}
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={styles.inputfield}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric"
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <TextInput
          style={styles.inputfield}
          placeholder="Address"
          value={Address}
          onChangeText={setAddress}
        />
        {errors.address && (
          <Text style={styles.errorText}>{errors.address}</Text>
        )}

        <TextInput
          style={styles.inputfield}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

        <TextInput
          style={styles.inputfield}
          placeholder="Pincode"
          value={Pincode}
          onChangeText={setPincode}
          keyboardType="numeric"
        />
        {errors.pincode && (
          <Text style={styles.errorText}>{errors.pincode}</Text>
        )}

        <TextInput
          style={styles.inputfield}
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />
        {errors.country && (
          <Text style={styles.errorText}>{errors.country}</Text>
        )}

        <TextInput
          style={styles.inputfield}
          placeholder="State"
          value={state}
          onChangeText={setState1}
        />
        {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

        <TouchableOpacity onPress={handleOnSubmit} style={styles.btn2}>
          <Text style={{color: '#000000', fontFamily:'Mulish-SemiBold' , fontSize: wp(4)}}>
            {item?.data == false ? 'EDIT ADDRESS' : 'SAVE ADDRESS'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {/* <BottumTab /> */}
    </View>
  );
};

export default Address;
