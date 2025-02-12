import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import styles from './styles';
import BottumTab from '../../../compoents/BottumTab';
import Header from '../../../compoents/Header';
import Loader from '../../../compoents/Loader';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { conatctus } from '../../../redux/slice/orderSclice';
import AntDesign from 'react-native-vector-icons/AntDesign';
const ContactUS = ({route}) => {
  const navigation=useNavigation();

  const loading = useSelector(state => state?.order?.loading);

   
  
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('')
  const [email, setEmailID] = useState('');
  const [subject, setsubject] = useState('');
  const [phone, setPhone] = useState('');
  const [lastname, setlastname] = useState('');
  const [message1, setMessage] = useState('');
 

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    let valid = true;
    const validationErrors = {};

  
    if (!FirstName.trim()) {
      validationErrors.firstName = 'Please enter your first name';
      valid = false;
    } else if (FirstName.length < 3) {
      validationErrors.firstName = 'Name must be at least 3 characters long';
      valid = false;
    }
    if (!LastName.trim()) {
      validationErrors.lastname = 'Please enter your last name';
      valid = false;
    } else if (LastName.length < 3) {
      validationErrors.lastname = 'Name must be at least 3 characters long';
      valid = false;
    }
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      validationErrors.email = 'Please enter your email';
      valid = false;
    } else if (!emailRegex.test(email)) {
      validationErrors.email = 'Please enter a valid email subject';
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

    // Validate subject
    if (!subject.trim()) {
      validationErrors.subject = 'Please enter your subject';
      valid = false;
    } else if (subject.length < 10) {
      validationErrors.subject = 'subject must be at least 10 characters';
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
     
     
      user_id:  userid,
      firstname:FirstName,
      lastname:LastName,
      mobile:phone,
     email:email,
      subject:subject ,
      message:message1,
    };
    console.log('hdghdg',addressData);
    

    try {
     
      await dispatch(conatctus({
        url:'contact-us',
        token,
        data: addressData,
        navigation,
      }));
        navigation.goBack();
    } catch (error) {
      console.error('Error saving subject:', error);
      Toast.show('Failed to save subject. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
     <View style={styles.header}>
        <View style={styles.back}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={wp(5.9)}
            color="#000000"
            
          />
          <View
            style={{
              width: wp(100),
              paddingHorizontal: wp(2),
            }}>
            <Text style={{fontSize: wp(5), color: '#000000', width:'100%', marginLeft:wp(5), fontFamily:'Mulish-Bold'}}>
              ContactUS
            </Text>
          </View>
        </View>
      </View>
      {loading?<Loader/>:null}
      <ScrollView style={{ marginTop: 20,paddingBottom:hp(20) }}>
        <TextInput
          style={styles.inputfield}
          placeholder="Name"
          value={FirstName}
          onChangeText={setFirstName}
        />
        {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
        <TextInput
          style={styles.inputfield}
          placeholder="Last Name"
          value={LastName}
          onChangeText={setLastName}
        />
        {errors.lastname && <Text style={styles.errorText}>{errors.lastname}</Text>}
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
          placeholder="Subject"
          value={subject}
          onChangeText={setsubject}
        />
        {errors.subject && <Text style={styles.errorText}>{errors.subject}</Text>}

        <TextInput
          style={[styles.inputfield,{height:hp(10)}]}
          placeholder="Message"
          value={message1}
          multiline={true}
          numberOfLines={5}
          onChangeText={setMessage}
        />
        {errors.message1 && <Text style={styles.errorText}>{errors.message1}</Text>}




        <TouchableOpacity onPress={handleOnSubmit} style={styles.btn2}>
          <Text style={{ color: '#000000',fontFamily:'Mulish-Bold', fontSize: wp(3.8) }}>{"SAVE"}</Text>
        </TouchableOpacity>

      </ScrollView>
      {/* <BottumTab /> */}
    </View>
  );
};

export default ContactUS;
