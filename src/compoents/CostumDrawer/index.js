import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Alert, Image, Platform, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Check from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const CostumDrawer = props => {
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.address?.loading);
  const profile = useSelector(state => state.address?.updatepro?.data);
  const profile1 = useSelector(state => state.address?.profile);

  const Logout = () => {
    Alert.alert(
      'Are you sure you want to log out?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {
            cancelable: false;
            navigation.dispatch(DrawerActions.closeDrawer());
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
    //  await AsyncStorage.setItem('token','');
    //  await AsyncStorage.clear()
    AsyncStorage.clear();
    navigation.navigate('Login', {data: true});
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <View style={styles.drawerContainer}>
      <View style={{width: '100%', backgroundColor: '#FFDE4D', height: hp(15)}}>
        <View style={styles.dp}>
         
          <View style={{marginLeft: wp(10)}}>
            <Text style={[styles.name, {fontSize: 20, fontFamily:'MUlish-Bold'}]}>
              welcome
            </Text>
            <Text style={styles.name}>{`Mr. ${profile1.name}`}</Text>
          </View>
        </View>
        <View style={[styles.DrawerItem, {marginTop: '3%', }]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('home');
              navigation.dispatch(DrawerActions.closeDrawer());
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: '100%',
                alignItems: 'center',
                left: '15%',
              }}>
              <Icon name="home" size={wp(6.8)} />

              <Text
                style={{fontSize: wp(4), fontFamily:'MUlish-Bold', marginLeft: '5%'}}>
                HOME
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.DrawerItem]}>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
              navigation.navigate('Categories');
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: '100%',
                alignItems: 'center',
                left: '15%',
              }}>
              <Feather name="grid" size={wp(6)} />

              <Text
                style={{fontSize: wp(4), fontFamily:'MUlish-Bold', marginLeft: '5%'}}>
                Shop By Category
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.DrawerItem]}>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
              // navigation.navigate('OrderList');
              navigation.navigate('Cart', {screen:'OrderList'})
            }}
            style={{
              flexDirection: 'row',
              height: '100%',
              alignItems: 'center',
              left: '15%',
            }}>
            <Check name="sticker-check-outline" size={wp(6.5)} />
            <Text
              style={{fontSize: wp(4), fontFamily:'MUlish-Bold', marginLeft: '5%'}}>
              My Orders
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.DrawerItem]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('career');
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
            style={{
              flexDirection: 'row',
              height: '100%',
              alignItems: 'center',
              left: '15%',
            }}>
            <AntDesign name="idcard" size={wp(6.3)} />
            <Text
              style={{fontSize: wp(4), fontFamily:'MUlish-Bold', marginLeft: '5%'}}>
              Career
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.DrawerItem]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('contactus');
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
            style={{
              flexDirection: 'row',
              height: '100%',
              alignItems: 'center',
              left: '19%',
            }}>
            <Foundation name="telephone" size={wp(6.7)} />
            <Text
              style={{fontSize: wp(4), fontFamily:'MUlish-Bold', marginLeft: '7%'}}>
              Contact Us
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.DrawerItem]}>
          <TouchableOpacity
            onPress={() => Logout()}
            style={{
              flexDirection: 'row',
              height: '100%',
              alignItems: 'center',
              left: '19%',
            }}>
            <Foundation name="power" size={wp(6.5)} />
            <Text
              style={{fontSize: wp(4), fontFamily:'MUlish-Bold', marginLeft: '7%'}}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            backgroundColor:'#FFDE4D',
             height: hp(100),
            width: '100%',borderWidth:2
          }}> */}
        <View style={{marginLeft: wp(15), height: hp(20), marginTop: 0}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Faq');
              navigation.dispatch(DrawerActions.closeDrawer());
            }}>
            <Text style={styles.terms}>FAQs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('about');
              navigation.dispatch(DrawerActions.closeDrawer());
            }}>
            <Text style={styles.terms}>ABOUT US</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Terms');
              navigation.dispatch(DrawerActions.closeDrawer());
            }}>
            <Text style={styles.terms}>TERMS OF USE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('privacy');
              navigation.dispatch(DrawerActions.closeDrawer());
            }}>
            <Text style={styles.terms}>PRIVACY POLICY</Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </View>
    </View>
  );
};
export default CostumDrawer;
const styles = StyleSheet.create({
  drawerContainer:{
    flex:1,
    backgroundColor:'#FCE7C8'
  },
  dp: {
    height: hp(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Platform.OS === 'ios' ? '75%' : '65%',
  },
  img: {
    height: wp(17),
    width: wp(17),
    borderRadius: wp(8.5),
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginLeft: wp(2),
  },
  name: {
    // alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    width: '100%',
    //textAlign:'center'
  },
  DrawerItem: {
    height: hp(8),
    borderBottomColor: 'grey',
  },
  terms: {
    fontSize: wp(4),
    fontWeight: '500',
    // color: 'white',
    paddingVertical: wp(3),
  },
});
