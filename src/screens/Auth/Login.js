import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Input from '../../compoents/Input';
import {loginUser, registerUser} from '../../redux/slice/Authsclice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../compoents/Loader';
const Login = ({route}) => {
  const data = route.params.data;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.Auth.loading);

  const [inputs, setInputs] = useState({
    email: '',
  });

  const handleInput = (text, input) => {
    setInputs(prev => ({...prev, [text]: input}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  const login = () => {
    {
      data == true
        ? dispatch(loginUser({user: inputs.email, navigation, url: 'login'}))
        : dispatch(
            registerUser({
              user: inputs.email,
              navigation,
              url: 'register-otp-send',
            }),
          );
    }
  };

  const SignUp = () => {
    navigation.navigate('Register');
    // data==false?navigation.navigate('Login',{data:true}):
    //   navigation.navigate('Login',{data:false})
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
          <View style={styles.logoConatainer}>
            <Image
              style={styles.img}
              source={require('../../assests/ecom.png')}
            />
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.login}>{data ? 'Login' : 'Register'}</Text>
            <Text style={styles.info}>
              Please enter the details below to continue
            </Text>
          </View>
          <View style={{marginHorizontal: 15}}>
            <Input
              onChangeText={input => {
                handleInput('email', input);
              }}
              value={inputs.email}
              // onFocus={() => handleError(null, 'email')}
              iconName="phone-outline"
              label="Mobile"
              placeholder="Enter your mobile Number"
              // error={errors.email}
            />
          </View>
          <View style={{marginTop: 50}}>
            <TouchableOpacity
              onPress={() => login()}
              style={{
                height: hp('7%'),

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
                  fontSize: data ? hp('3%') : hp('2.5%'),
                  fontWeight: 'bold',
                  color: '#000000',
                  alignSelf: 'center',
                }}>
                {data ? 'Login' : 'OTP Veryfy'}
              </Text>
            </TouchableOpacity>
          </View>
          {/* <Text onPress={() => navigation.navigate('Forget')} style={{
                alignSelf: 'flex-end',
                marginRight: '5%',
                fontSize: hp('2.4%'),
                color: 'grey',
                marginTop: 10
            }}>Forgot password ?</Text> */}

          <View
            style={{
              alignContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              marginVertical: hp('5%'),
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text>Dont't have an account ? </Text>
            <TouchableOpacity onPress={() => SignUp()}>
              <Text style={{color: '#FFDE4D', fontFamily:'Mulish-Bold'}}>
                {data == false ? 'Login!' : 'Sign Up!'}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCE7C8',
  },
  logoConatainer: {
    marginTop: 20,
    width: '100%',
    height: hp(15), // Updated to a number
  },
  infoTextContainer: {
    marginHorizontal: '5%',
    marginVertical: '8%',
  },
  login: {
    fontSize: hp(4), // Updated to a number
   fontFamily:'Mulish-Bold',
    color: '#000000',
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  info: {
    fontSize: hp(1.8), // Updated to a number
    fontFamily:'Mulish-SemiBold',
    color: 'grey',
  },
  errorText: {
    color: 'red',
    marginHorizontal: '5%',
  },
});
