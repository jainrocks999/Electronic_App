import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';
import BottumTab from '../../../compoents/BottumTab';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import Loader from '../../../compoents/Loader';
import Imagepath from '../../../compoents/Imagepath';
import {productsbycategories} from '../../../redux/slice/Homesclice';

const Subcategory = ({navigation, route}) => {
 
  const [show, setShow] = useState({
    acount: false,
    payment: false,
  });
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  // const {item} = route.params;
  const item = route?.params?.item || {}; 

  const isLoading = useSelector(state => state.home?.loading);

  const dispatch = useDispatch();

  const hanndleProduct = async item => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');

    await dispatch(
      productsbycategories({
        id: userid,
        token: token,
        category: item.id,
        url: 'category-by-product',
        navigation,
      }),
    );
    // navigation.navigate('Subcategory2', {item});
    navigation.navigate('Categories', { screen: 'Subcategory2', item:item });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FCE7C8'}}>
      {isLoading ? <Loader /> : null}
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
              <Text style={styles.txt}>Products</Text>
            </View>
          </View>
          <View style={{marginLeft: wp(45)}}></View>
        </View>
        <View
          style={{
            flex: 1,
            width: wp(100),
            marginTop: 2,
          }}>
          {item?.active_children?.length != 0 ? (
            <FlatList
              data={item?.active_children}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()} // Ensure the key is unique
              renderItem={({item, index}) => {
                // Corrected destructuring

                return (
                  <TouchableOpacity
                  style={styles.cardView}
                  onPress={
                    () => hanndleProduct(item)
                    //   navigation.navigate('Subcategory2', {item})
                  }>
                  {/* <View > */}
                    <View style={styles.imgcontainer}>
                      {/* <TouchableOpacity
                        onPress={
                          () => hanndleProduct(item)
                          //   navigation.navigate('Subcategory2', {item})
                        }> */}
                        <Image
                          style={styles.img}
                          source={
                            item.image
                              ? {uri: `${Imagepath.Path}${item.image}`}
                              : require('../../../assests/noimg.jpeg')
                          }
                        />
                      {/* </TouchableOpacity> */}
                    </View>
                    <Text style={styles.txt2}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>{'No products found'}</Text>
            </View>
          )}
        </View>
      </View>
      {/* <BottumTab /> */}
    </View>
  );
};
export default Subcategory;
