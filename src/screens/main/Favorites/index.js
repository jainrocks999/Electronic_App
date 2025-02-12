import React, {useEffect} from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import BottumTab from '../../../compoents/BottumTab';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Products} from '../../../data/Products';
import Card from '../../../compoents/Card';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import Loader from '../../../compoents/Loader';
import {WishlistData} from '../../../redux/slice/Homesclice';
const Favorit = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocuse = useIsFocused();
  const product = useSelector(state => state.home.WishlistD?.data);
  const isloaidng = useSelector(state => state.home.loading);

  useEffect(() => {
    viewWishList();
  }, [isFocuse]);

  const viewWishList = async () => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    dispatch(
      WishlistData({
        url: 'wishlist-product',
        token: token,
        user_id: userid,
        page: 1,
      }),
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FCE7C8'}}>
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={wp(5.9)}
              color="#000000"
            />
            <View style={{marginLeft: wp(4)}}>
              <Text style={styles.txt}>Wishlist</Text>
            </View>
          </View>
          <View style={{marginLeft: wp(45)}}></View>
        </View>
        {isloaidng ? <Loader /> : null}
        {product?.length == 0 ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Your wishlist is empty</Text>
          </View>
        ) : (
          <FlatList
            data={product}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            renderItem={({item}) => {
              return <Card item={item} sendData={() => RemoveWishList(item)} />;
            }}
          />
        )}
      </View>
      {/* <BottumTab /> */}
    </View>
  );
};

export default Favorit;
