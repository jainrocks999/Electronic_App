import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const Success = ({route}) => {
  const navigation = useNavigation();

  function handleBackButtonClick() {
    return true;
  }

  //   useEffect(() => {
  //     clearData();
  //   });

  //   const clearData = async () => {
  //     await storage.removeItem(storage.CUSTOMER);
  //     dispatch({
  //       type: 'setCustomer',
  //       payload: {
  //         remark,
  //         customer,
  //         address,
  //         id: undefined,
  //       },
  //     });
  //   };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Image
          style={{height: 50, width: 50}}
          source={require('../../../assests/save123.jpg')}
        />
        <Text style={styles.text}>{`Your Order successfully created`}</Text>
        <Text style={styles.thankyou}>Thank you</Text>
        <TouchableOpacity
          onPress={() => navigation.reset({index: 0, routes: [{name: 'Home'}]})}
          style={styles.submitview}>
          <Text style={styles.ok}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Success;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCE7C8',
  },
  main: {
    flex: 1,
    backgroundColor: '#FCE7C8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thankyou: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 2,
  },
  text: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Mulish-SemiBold',
    marginTop: 15,
  },
  clickableText: {
    fontSize: 16,
    color: 'blue', // Change the color to indicate it's clickable
    // fontFamily: 'Montserrat-SemiBold',
    textDecorationLine: 'underline', // Optional: Add underline for better indication
  },
  submitview: {
    backgroundColor: '#FFDE4D',
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 40,
  },
  ok: {
    color: '#000000',
    fontSize: widthPercentageToDP(4),
    fontFamily:'Mulish-SemiBold'
  },
});
