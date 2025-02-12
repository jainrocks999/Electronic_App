import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loader from '../../../compoents/Loader';
import WebView from 'react-native-webview';
import Toast from 'react-native-simple-toast';
import HTMLView from 'react-native-htmlview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Termsandcondtion} from '../../../redux/slice/orderSclice';
const TermsAndCondition = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state?.order?.loading);
  const data = useSelector(state => state?.order?.TermsC);

  const navigation = useNavigation();
  const apiCall = async () => {
    const token = await AsyncStorage.getItem('Token');
    const userId = await AsyncStorage.getItem('user_id');

    await dispatch(
      Termsandcondtion({
        user_id: userId,
        token: token,

        url: `pages?page=Terms %26amp; Conditions&`,
      }),
    );
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
            <Text style={{fontSize: wp(5), color: '#000000', marginLeft:wp(5), fontFamily:'Mulish-Bold'}}>
              Terms & Conditions
            </Text>
          </View>
        </View>
      </View>

      {loading ? <Loader /> : null}
      {/* <WebView
          source={{ html: data?.data?.content }}      
        onLoad={() => setLoading(false)}
        style={styles.webview}
      /> */}

      <ScrollView contentContainerStyle={{padding: 16}}>
        <HTMLView value={data?.content} stylesheet={htmlStyles} />
      </ScrollView>
    </SafeAreaView>
  );
};
const htmlStyles = StyleSheet.create({
  //     h4: {
  //       fontSize: wp(4.5),
  //       fontWeight: '',
  //       color: '#2c3e50',
  //     //    marginTop:10,
  //    //    marginBottom: 4,
  //     },
  //     p: {
  //       fontSize: wp(3.7),
  //       lineHeight: 26,
  //       color: '#4f4f4f',
  //     },
  //     li: {
  //       fontSize: wp(3.6),
  //        lineHeight: 18,
  //       color: '#4f4f4f',
  //     },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#FCE7C8',
  },
  webview: {
    flex: 1,
  },
  header: {
    height: hp(6),
    width: wp(100),
    backgroundColor: '#FFDE4D',
    alignItems: 'center',

    paddingHorizontal: wp(5),
    flexDirection: 'row',
  },
  back: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth:1,
    width: wp(30),
    alignItems: 'center',
  },
});

export default TermsAndCondition;
