import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BottumTab from '../../../compoents/BottumTab';
import Header from '../../../compoents/Header';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../compoents/Loader';
import { getAddress } from '../../../redux/slice/AddressSclice';
export default function Myaddress() {
 
 const isLoading=useSelector(state=>state.address.loading);
 const addresstoget=useSelector(state=>state.address.getaData?.data);
  const dispatch = useDispatch()
  const focus=useIsFocused();
useEffect(()=>{
if(focus){
  AddressList();
}
 
},[focus])
const AddressList = async()=>{

const token = await AsyncStorage.getItem('Token');
const userid = await AsyncStorage.getItem('user_id');
await  dispatch(getAddress({  
  user_id: userid,
  
  token: token,
 
  url:'fetch-customer-address',
  // navigation,
}));
}

  const DeleteAddress = async (Id) => {
    const token = await AsyncStorage.getItem('token')
    const res = dispatch({
      type: "openCart/fetchDeleteAddress",
      token: token,
      id: Id
    })
    AddressList()
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFDE4D' }}>
    <Header />
    {isLoading?<Loader/>:null}
    <ScrollView
      style={{ width: '100%', backgroundColor: '#ffffff' }}
      contentContainerStyle={{ }}
      showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 20 , marginTop:20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Your Addresses</Text>
       
        <TouchableOpacity

          onPress={() => {
            navigation.navigate('Address')
          }}
          style={{
            marginTop: '3%',
            flexDirection: 'row', justifyContent: 'space-between',
            padding: 10, borderTopWidth: 0.5, borderBottomWidth: 0.5,
          }}>
          <Text style={{ fontSize: 18, textDecorationLine:'underline',marginHorizontal: -8 ,   }}>
            Add a new address
          </Text>
          <Text style={{ fontSize: 15 }}></Text>
        </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: '700',  marginVertical: 20 }}>Saved Addresses</Text>
            </View>
        <View style={{ flex: 1 }}>
          <View style={styles.CardContainer}>

            <FlatList
              data={addresstoget}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => {

                return (
                  <View style={{ borderWidth: 1, padding: 10, marginVertical: 4, marginHorizontal: 20, borderRadius: 10 }}>

                    <Text style={{ fontWeight: '600', fontSize: 16 }}>{item.name} </Text>
                    <Text>{item.address}</Text>
                    <Text>{item.city} {item.zip_code} {item.state}</Text>
                    <Text>{item.country}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 15, height:35 ,}}>

                      <TouchableOpacity
                        onPress={() => { alert('Edit') }}
                        style={{ padding: 10, borderRadius: 10, backgroundColor: '#FFDE4D' ,justifyContent:'center'}}>
                        <Text style={{color:'white'}}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => { DeleteAddress(item.address_id) }}
                        style={{ padding: 10, marginHorizontal: 30, borderRadius: 10, backgroundColor: '#FFDE4D',justifyContent:'center' }}>
                        <Text style={{color:'white'}}>Remove</Text>
                      </TouchableOpacity>

                    </View>
                  </View>

                );

              }}
            />
          </View>

        </View>

    

    </ScrollView>
      <BottumTab />
    </View>
  )
}

const data = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  },
]