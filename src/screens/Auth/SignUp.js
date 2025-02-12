import {
  View,
  Text,
  Image,
  StyleSheet,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Input from '../../compoents/Input';
import Button2 from '../../compoents/Button2';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../compoents/Loader';
import {registerUser, signUpUser} from '../../redux/slice/Authsclice';
const SignUp = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.Auth.loading);
  const [inputs, setInputs] = React.useState({
    email: '',
    firstname: '',
    telephone: '',
  });
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = useState(true);
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Please input email address', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }
    if (!inputs.firstname) {
      handleError('Please input firstname', 'firstname');
      isValid = false;
    }

    if (!inputs.telephone) {
      handleError('Please input Mobile number', 'telephone');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };
  const register = () => {
    dispatch(registerUser({user: inputs, navigation, url: 'otp-send'}));
    // dispatch(signUpUser({user:inputs,navigation,url:'sign-up' }))
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loader /> : null}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.infoTextContainer}>
            <Text style={styles.login}>Register</Text>
            <Text style={styles.info}>
              Please enter the details below to continue
            </Text>
          </View>
          <View
            showsVerticalScrollIndicator={false}
            style={{marginHorizontal: '3%'}}>
            <Input
              onChangeText={text => handleOnchange(text, 'firstname')}
              onFocus={() => handleError(null, 'firstname')}
              iconName="account-outline"
              label="First Name"
              placeholder="Enter your first name"
              error={errors.firstname}
            />

            <Input
              onChangeText={text => handleOnchange(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              iconName="email-outline"
              label="Email"
              placeholder="Enter your email address"
              error={errors.email}
            />
            <Input
              keyboardType="numeric"
              onChangeText={text => handleOnchange(text, 'telephone')}
              onFocus={() => handleError(null, 'telephone')}
              iconName="phone-outline"
              value={inputs.telephone}
              label="Mobile Number"
              placeholder="Enter your Mobile no"
              error={errors.telephone}
            />
          </View>
          <TouchableOpacity
            onPress={() => validate()}
            style={{
              height: hp('7%'),
              marginTop: hp(3),
              marginBottom: hp(0.5),
              marginHorizontal: wp('3%'),
              backgroundColor: '#FFDE4D',
              //  : '#0d52d6'
              elevation: 5,
              flexDirection: 'row',
              borderRadius: hp('.50%'),
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            activeOpacity={0.2}>
            <Text
              style={{
                fontSize: hp('3%'),
                fontWeight: 'bold',
                color: '#000000',
                alignSelf: 'center',
              }}>
              Register
            </Text>
          </TouchableOpacity>
          {/* <Button2 title="Register" onPress={validate} /> */}

          <View
            style={{
              alignContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              marginBottom: 15,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text>Already have an account ? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login', {data: true})}>
              <Text style={{color: '#FFDE4D', fontFamily:'Mulish-Bold', marginTop:5}}> Login!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCE7C8',
  },
  logoConatainer: {
    top: hp(1), 
    width: '90%',
    height: hp(10), 
    marginHorizontal: '5%',
  },
  infoTextContainer: {
    marginHorizontal: '2.5%',
    marginVertical: hp(2), 
  },
  login: {
    fontSize: 20,
   fontFamily:'Mulish-Bold',
    color: 'black',
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  info: {
   fontFamily:'Mulish-SemiBold',
    color: 'grey',
  },
});
