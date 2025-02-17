import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import BottumTab from '../../../compoents/BottumTab';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../../compoents/Loader';
import Imagepath from '../../../compoents/Imagepath';
import {
  addwishlist1,
  brandcategory,
  productDetail,
} from '../../../redux/slice/Homesclice';

const Subcategory = ({ navigation, route }) => {
  const [show, setShow] = useState({
    acount: false,
    payment: false,
  });
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const Brandcat1 = useSelector(state => state?.home?.Brandcat);
  const isLoading = useSelector(state => state.home?.loading);
  const [showSubCategories, setShowCategories] = useState(false);
  const dispatch = useDispatch();

  const onHandleList = (name, value) => {
    setShow(prevState => ({ ...prevState, [name]: value }));
  };
  const addWishList = async item => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    await dispatch(
      addwishlist1({
        user: userid,
        id: item.id,
        token: token,
        isadd: item.is_wishlist,
        url: 'wishlist-product-add',
      }),
    );
    {
      isLoading == false
        ? await dispatch(
          brandcategory({
            user: userid,
            id: item.brand_id,
            token: token,

            url: 'brand-by-product',
            navigation,
            nav: false,
          }),
        )
        : null;
    }
  };
  // const handleDetail = async item => {
  //   const token = await AsyncStorage.getItem('Token');
  //   const userid = await AsyncStorage.getItem('user_id');
  //   await dispatch(
  //     productDetail({
  //       user: userid,
  //       id: item.id,
  //       token: token,

  //       url: 'fetch-single-product',
  //       navigation,
  //     }),
  //   );
  // };

  const handleDetail = async item => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');

    console.log('Token:', token);
    console.log('User ID:', userid);
    console.log('Product ID:', item.id);

    const result = await dispatch(
      productDetail({
        user: userid,
        id: item.id,
        token: token,
        url: 'fetch-single-product',
        navigation,
      }),
    );

    if (productDetail.fulfilled.match(result)) {
      console.log('API Response:', result.payload);
    } else if (productDetail.rejected.match(result)) {
      console.log('API Error:', result.payload);
    }
  };


  const removeHtmlTags = str => {
    return str?.replace(/<\/?[^>]+(>|$)/g, '');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FCE7C8' }}>
      {isLoading ? <Loader /> : null}
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign
              onPress={() => navigation.navigate('Home')}
              name="arrowleft"
              size={wp(5.9)}
              color="#000000"
            />
            <View style={{ marginLeft: wp(4) }}>
              <Text style={styles.txt}>Products</Text>
            </View>
          </View>
          <View style={{ marginLeft: wp(45) }}></View>
        </View>
        <View
          style={{
            flex: 1,
            width: wp(100),
            marginTop: 10,
          }}>
          {Brandcat1 != 0 ? (
            <FlatList
              data={Brandcat1}
              onEndReached={() => { }}
              onEndReachedThreshold={1}
              numColumns={2}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={() => handleDetail(item)} style={styles.cardView}>
                    <View style={styles.imgcontainer}>
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          top: 3,
                          right: 0,
                          left: 0,
                          zIndex: 10,
                          height: hp(3),
                          width: wp(8),
                        }}
                        onPress={() => addWishList(item)}>
                        <AntDesign
                          // name="hearto"
                          name={item.is_wishlist ? 'heart' : 'hearto'}
                          style={[
                            styles.iconic,
                            { color: item.is_wishlist ? 'red' : 'grey' },
                          ]}
                        />
                      </TouchableOpacity>

                      <Image
                        style={styles.img}
                        source={
                          item.images
                            ? { uri: `${Imagepath.Path}${item.images}` }
                            : require('../../../assests/noimg.jpeg')
                        }
                      />

                    </View>

                    <Text style={styles.txt2}>{removeHtmlTags(item.name)
                      ?.split('\n')
                      .filter(line => line.trim())[0]
                      ?.substring(0, 30)}{' '}
                      ...</Text>
                    <Text style={{ marginTop: 5, fontFamily: 'Mulish-SemiBold', minHeight: wp(18), fontSize: wp(3.5) }}>

                      {removeHtmlTags(item.description)
                        ?.split('\n')
                        .filter(line => line.trim())[0]
                        ?.substring(0, 25)}{' '}
                      ...
                    </Text>
                    <View style={styles.priceCOntainer}>
                      {item.special ? (
                        <>
                          <Text style={[styles.Price, {color: 'black'}]}>
                            {item.special}
                          </Text>
                          <Text
                            style={[
                              styles.Price,
                              {
                                textDecorationLine: 'line-through',
                                fontSize: wp(3),
                                fontWeight: 'bold',
                                marginLeft: wp(1),
                                color: 'red',
                              },
                            ]}>
                            ₹ {item.sale_price}
                          </Text>
                        </>
                      ) : (
                        <Text style={[styles.Price, {color: 'black'}]}>
                          ₹ {item.sale_price || item.price}
                        </Text>
                      )}
                     

                      <Text
                        style={[
                          styles.Price,
                          {
                            fontSize: wp(3),
                            fontWeight: 'bold',
                            marginTop: 5,
                            marginBottom: 10,
                            color: 'grey',
                          },
                        ]}>
                        Ex Tax:{' '}
                        <Text style={{ textDecorationLine: 'line-through' }}>
                          ₹ {item.price}
                        </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    backgroundColor: 'white',
    elevation: 1,
  },
  header: {
    height: hp(7),
    backgroundColor: '#FFDE4D',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    flexDirection: 'row',
  },
  txt: {
    marginLeft: wp(5),
    fontFamily: 'Mulish-Bold',
    fontSize: wp(4.5),
    color: '#000000',
  },
  back: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(30),
    alignItems: 'center',
  },
  headerContainer: {
    marginTop: '3%',
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profilePick: {
    backgroundColor: 'white',
    height: hp('6%'),
    width: hp('6%'),
    borderRadius: hp('6%'),
    overflow: 'hidden',
  },
  icon: {
    fontSize: hp('5%'),
    color: '#FFDE4D',
    alignSelf: 'center',
  },
  input: {
    height: hp('7.5%'),
    marginBottom: hp('2%'),
    marginHorizontal: wp('5%'),
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: hp('.5%'),
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    elevation: 1,
    marginTop: '2%',
  },
  picker: {
    width: '17%',
    backgroundColor: '#FFDE4D',
    borderRadius: hp('.50%'),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: '.50%',
  },
  photos: {
    height: hp('30%'),
    width: wp('100%'),
    alignItems: 'center',
    backgroundColor: '#e6f0f2',
  },
  con: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  viewcontainer: {
    backgroundColor: '#333',
    height: hp('10%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cicle: {
    height: hp('5%'),
    width: hp('5%'),
    borderRadius: hp('6%'),
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(13, 82, 214, 1)',
  },
  historyContainer: {
    margin: '2%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  category: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: '#FFDE4D',
  },
  categoryContainer: {
    height: hp('16%'),
    width: wp('30%'),
    borderRadius: hp('.50%'),
    overflow: 'hidden',
  },
  txtContainer: {
    height: hp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(25),
  },
  titleContainer: {
    width: wp(95),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp(5),
    backgroundColor: 'white',
  },
  listCard: {
    height: hp(12),
    width: hp(12),
    borderRadius: wp(3),
    backgroundColor: 'white',
  },
  cardImage: {
    height: '100%',
    width: '100%',
    borderRadius: wp(3),
    resizeMode: 'contain',
  },
  text: {
    alignSelf: 'center',
    color: 'black',
    fontSize: wp(3),
  },
  ViewContainer: {
    height: '85%',
    width: '58%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  img2: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    marginTop: '10%',
  },

  cardView: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    backgroundColor: '#ffffff',
    margin: wp(1),
    width: wp(48),
    borderRadius: wp(2),
    shadowColor: 'black',
    shadowOpacity: 0.05,
  },
  cardsView: {
    backgroundColor: '#e6f0f2',
    width: wp(35),
    marginHorizontal: wp(2),
    borderRadius: wp(2),
    shadowColor: 'black',
    shadowOpacity: 0.05,
  },
  loadMoreButtonText: {
    color: 'black',
  },
  CardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp(1),
    marginHorizontal: wp(2),
  },
  imgcontainer: {
    height: wp(40),
    width: '100%',
  },

  img: {
    marginTop: 10,
    height: '90%',
    width: '100%',
    resizeMode: 'contain',
    borderTopLeftRadius: wp(2),
    borderTopRightRadius: wp(2),
  },
  images: {
    height: '100%',
    width: '100%',
  },
  txt2: {
    minHeight: wp(10),
    marginTop: wp(2),
    fontSize: wp(3.5),
    color: '#000000',
    fontFamily: 'Mulish-SemiBold'
  },
  txt3: {

    alignSelf: 'center',
    marginTop: wp(2),
    fontSize: wp(4),
    fontWeight: '300',
    color: 'black',
  },

  priceCOntainer: {
    marginTop: hp(-2),
  },
  Price: {
    fontSize: wp(5),
    fontFamily: 'Mulish-SemiBold',
    color: 'black',
  },

  searchContainer: {
    backgroundColor: 'white',
  },
  searchBarContainer: {
    backgroundColor: 'white',
    borderBottomColor: 'white',
    borderTopColor: 'white',
  },
  searchBarInputContainer: {
    backgroundColor: 'white',
  },
  icon2: {
    fontSize: wp(7),
    position: 'absolute',
    top: -hp('69%'),
  },
  iconic: {
    fontSize: wp(7),
    position: 'absolute',
  },
});
