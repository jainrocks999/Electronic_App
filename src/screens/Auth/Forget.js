import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import OtpInputs from 'react-native-otp-inputs';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {
  loginUser,
  registerUser,
  signUpUser,
} from '../../redux/slice/Authsclice';
import Loader from '../../compoents/Loader';
const Forget = ({route}) => {
  const item = route.params;

  const data1 = item.register ? item.item : item.item.telephone;

  const isLoading = useSelector(state => state.Auth.loading);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isFocused, setIsfocused] = useState(true);
  const [otp, setOtp] = useState('');

  const [timer, setTimer] = useState(60);
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsDisabled(false);
    }
  }, [timer]);

  const handleResendOTP = () => {
    setTimer(60);
    setIsDisabled(true);
  };

  const resendOtp = () => {
    handleResendOTP();
    if (item?.register) {
      dispatch(loginUser({user: item.item, navigation, url: 'login'}));
    } else {
      dispatch(
        registerUser({user: item.item, navigation, url: 'otp-send'}),
      );
    }
  };
  const handleVerifyOtp = () => {
    if (otp.length == '') {
      Toast.show('Please enter the OTP');
    } else if (otp.length == 4) {
      if (otp == item?.data?.OTP) {
        if (item?.register) {
          navigation.navigate('Home');
        } else {
          dispatch(signUpUser({user: item.item, navigation, url: 'sign-up'}));
        }
        Toast.show('OTP Verified Successfully!');
      } else {
        Toast.show('Incorrect OTP. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoConatainer}>
        <Image style={styles.img} source={{}} />
      </View>
      {isLoading ? <Loader /> : null}
      <View style={styles.infoTextContainer}>
        <View style={{width: wp(80), alignSelf: 'center'}}>
          <Text
            style={{
              marginVertical: wp(1),
              fontSize: wp(4.4),

              color: 'grey',
            }}>
             {/* {'Please enter the OTP '} */}
            {/* {'Please enter the OTP sent to your mobile number ' + '+91' + data1} */}
          </Text>
          <Text
            style={{
              marginVertical: wp(1),
              fontSize: wp(4.4),
              marginBottom:hp(6),
              color: 'grey',
            }}>
            {'Please enter the OTP  ' + item?.data.OTP}
          </Text>
          <OtpInputs
            handleChange={text => setOtp(text)}
            numberOfInputs={4}
            autofillFromClipboard={false}
            style={styles.otpContainer}
            inputStyles={styles.input}
          />
        </View>
        {isLoading ? null : (
          <Text
            style={{
              fontSize: wp('3%'),
              fontWeight: '400',
              color: '#161616',
              marginLeft: wp(10),
              fontFamily: 'Lato-Bold',
              marginTop: hp('1.5%'),
            }}>
            {isDisabled ? (
              <>
                Resend OTP in
                <Text style={{color: '#FC0600'}}> {timer} </Text>
                seconds
              </>
            ) : (
              ''
            )}
          </Text>
        )}

        <TouchableOpacity
          disabled={isDisabled ? true : false}
          onPress={() => resendOtp()}
          style={{
            alignSelf: 'flex-end',
            marginTop: hp('2%'),
            marginRight: wp('10%'),
          }}>
          <Text
            style={{
              color: isDisabled ? '#161616' : '#FC0600',
              fontWeight: '600',
              fontSize: wp('3.5%'),
              fontFamily: 'Lato-Bold',
            }}>
            Resend OTP
          </Text>
        </TouchableOpacity>
        {/* <View style={styles.line}></View> */}
      </View>

      <View style={{marginTop: hp(15)}}>
        <TouchableOpacity
          onPress={() => handleVerifyOtp()}
          style={{
            height: hp('7%'),

            marginHorizontal: wp('3%'),
            backgroundColor: isFocused ? '#FFDE4D' : '#0d52d6',
            elevation: 5,
            flexDirection: 'row',
            borderRadius: hp('.50%'),
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          activeOpacity={0.2}
          onFocus={() => {
            setIsfocused(true);
          }}
          onBlur={() => setIsfocused(false)}>
          <Text
            style={{
              fontSize: hp('3%'),
              fontFamily:'Mulish-Bold',
              color: '#000000',
              alignSelf: 'center',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Forget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCE7C8',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 8,
  },
  logoConatainer: {
    width: '100%',
    height: hp(20), // Updated to a number
  },
  infoTextContainer: {
    // marginHorizontal: '5%',
    // marginVertical: '8%'
  },
  login: {
    fontSize: hp(4), // Updated to a number
    fontWeight: 'bold',
    color: 'grey',
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  info: {
    fontSize: hp(2), // Updated to a number
    fontWeight: '400',
    color: 'grey',
  },
  login: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: 'black', //'#a26a39',
    fontStyle: 'italic',
    alignSelf: 'center',
    marginTop: wp(6),
  },
  errorText: {
    color: 'red',
    marginHorizontal: '5%',
  },
});
