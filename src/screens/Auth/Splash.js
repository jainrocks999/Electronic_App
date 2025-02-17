import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      goToto();
    }, 2000);
    const goToto = async () => {
      const user_id = await AsyncStorage.getItem('user_id');
      const token1 = await AsyncStorage.getItem('Token');
      console.log('data are geting ...', token1, user_id);

      if (token1 == null) {
        navigation.navigate('Login', {data: true});
      } else {
        navigation.navigate('Home');
      }
    };
  });
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFDE4D',
      }}>
      <View
        style={{
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            height: hp(20),
            width: wp(50),
            tintColor: 'white',
          }}
          source={require('../../assests/ecom.png')}
        />
      </View>
    </View>
  );
};
export default Splash;
