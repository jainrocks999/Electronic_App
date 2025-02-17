import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  BackHandler,
  Dimensions
} from 'react-native';
import styles from './Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width } = Dimensions.get("window");
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../compoents/Header';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../compoents/Loader';

import {
  product,
  category,
  addwishlist1,
  productDetail,
  Banner,
  brands,
  brandcategory,
} from '../../../redux/slice/Homesclice';
import Toast from 'react-native-simple-toast';
import Imagepath from '../../../compoents/Imagepath';
import { profiledata } from '../../../redux/slice/AddressSclice';
import { orderlistapi } from '../../../redux/slice/orderSclice';
let backPress = 0;
const Home = () => {
  const products = useSelector(state => state.home?.product);
  const data = useSelector(state => state.home?.Categories);
  const silder1 = useSelector(state => state.home?.Bannerdata);

  const data1 = useSelector(state => state?.home?.Brand);
  const navigation = useNavigation();
  const loading = useSelector(state => state.home.loading);
  const loading1 = useSelector(state => state?.order?.loading);

  const focus = useIsFocused();

  const [activeSlide, setActiveSlide] = useState(0);
  const dispatch = useDispatch();
  const silder = [
    require('../../../assests/iphone.jpeg'),
    require('../../../assests/macbook.jpeg'),
  ];
  const isFocus = useIsFocused();

  useEffect(() => {
    if (focus) {
      apicall();
    }
  }, [focus]);

  const apicall = async () => {
    try {
      const token = await AsyncStorage.getItem('Token');
      const userid = await AsyncStorage.getItem('user_id');

      if (!token || !userid) {
        console.error('Token or User ID is missing.');
        return;
      }

      await dispatch(Banner({ id: userid, token: token, url: 'home-slider' }));
      await dispatch(product({ id: userid, token: token, url: 'products' }));
      await dispatch(brands({ id: userid, token: token, url: 'product-brand' }));
      await dispatch(
        orderlistapi({ id: userid, token: token, url: 'fetch-order' }),
      );

      await dispatch(
        category({ id: userid, token: token, url: 'product-category' }),
      );
      await dispatch(
        profiledata({ id: userid, token: token, url: 'profile-list' }),
      );
    } catch (error) {
      console.error('Error in API call:', error);
    }
  };

  const removeHtmlTags = str => {
    return str?.replace(/<\/?[^>]+(>|$)/g, '');
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => backHandler.remove();
  }, []);

  const handleBackButtonClick = () => {
    if (navigation.isFocused()) {
      if (backPress > 0) {
        BackHandler.exitApp();
        backPress = 0;
      } else {
        backPress++;
        Toast.show('Press again to exit app');
        setTimeout(() => {
          backPress = 0;
        }, 2000);
        BackHandler.removeEventListener('hardwareBackPress');
      }
      return true;
    }
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
  };
  const handleDetail = async item => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    await dispatch(
      productDetail({
        user: userid,
        id: item.id,
        token: token,

        url: 'fetch-single-product',
        navigation,
      }),
    );
  };
  const brandscategories = async item => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');

    await dispatch(
      brandcategory({
        user: userid,
        id: item.id,
        token: token,

        url: 'brand-by-product',
        navigation,
        nav: true,
      }),
    );
  };


  const carouselRef = useRef(null);


  const sliderData =
    Array.isArray(silder1?.data) ? silder1?.data[0].slider_items : [];

  return (
    <View style={{ flex: 1, backgroundColor: '#FCE7C8' }}>
      <Header />
      {loading || loading1 ? <Loader /> : null}
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <ScrollView
        style={{ width: '100%', backgroundColor: '#FCE7C8' }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Carousel
            ref={carouselRef}
            data={sliderData}
            renderItem={({ item }) => (
              <View style={styles.slide}>
                <Image
                  style={styles.image}
                  source={
                    item.image
                      ? { uri: `${Imagepath.Path}${item.image}` }
                      : require("../../../assests/noimg.jpeg")
                  }
                />
              </View>
            )}
            sliderWidth={width}
            itemWidth={width * 0.93}
            loop
            autoplay
            autoplayInterval={3000}
            onSnapToItem={(index) => setActiveSlide(index)}
          />

          {/* Pagination Dots */}
          <Pagination
            dotsLength={sliderData.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.activeDot}
            inactiveDotStyle={styles.inactiveDot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>

        <View
          style={{
            marginTop: -25,
            height: hp(5),
            width: wp(100),
            backgroundColor: 'white',
            marginVertical: 20,
            justifyContent: 'center',
          }}>
          <View style={styles.titleContainer}>
            <Text style={styles.category}>Top Categories</Text>
            <Text
              onPress={() => navigation.navigate('Categories', {screen: 'Categories'})}
              style={[
                styles.category,
                {
                  color: '#000000',
                  fontWeight: '400',
                  textDecorationLine: 'underline',
                  fontSize: wp(4),
                  marginRight: 20,
                },
              ]}>
              See All
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: -5,
            paddingLeft:wp(1),
            width: '100%',
            backgroundColor: '#FCE7C8',
            height: hp('23%'),
            justifyContent: 'center',
          }}>
          <View style={{ marginTop:wp(-5)}}>
            <FlatList
              data={data?.slice(0, 4)}
             
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item, index }) => {
                if (index === 1) {
                }
                return (
                  <TouchableOpacity
                  onPress={() =>
                    // navigation.navigate('Categories', { screen: 'Subcategory', item: item })
                    navigation.navigate('Subcategory', {item})
                  }
                  style={styles.cardsView} 
                >
                    <View style={styles.imagecontainer}>
                      
                        <Image
                          style={styles.images}
                          source={
                            item.image
                              ? { uri: `${Imagepath.Path}${item.image}` }
                              : require('../../../assests/noimg.jpeg')
                          }
                        />
                    </View>
                    <Text style={styles.txt2}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>

        <View
          style={{
            height: hp(5),
            width: wp(100),
            // backgroundColor: 'white',
            marginVertical: 20,
            justifyContent: 'center',
            
          }}>
          <View style={styles.titleContainer1}>
            <Text style={styles.category}>Featured Brands</Text>
            <Text
              // onPress={() => navigation.navigate('Categories1')}
              onPress={() => navigation.navigate('Categories', {screen: 'Categories1'})}

              style={[
                styles.category,
                {
                  color: '#000000',
                  fontWeight: '400',
                  textDecorationLine: 'underline',
                  fontSize: wp(4),
                  marginRight: 20,
                },
              ]}>
              See All
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop:wp(-5),
            paddingLeft:wp(1),
            justifyContent: 'center',
            width: '100%',
            height: hp('20%'),
            justifyContent: 'center',
            
          }}>
          <View style={{  borderWidth:0,}}>
            <FlatList
              data={Array.isArray(data1) ? data1?.slice(0, 4) : []}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item, index }) => {
                if (index === 1) {
                }
                return (
                  <TouchableOpacity
                  onPress={() => brandscategories(item)}
                  style={styles.cardsView} // Keep the card's styling here
                >
                    <View style={styles.imagecontainer}>
                      {/* <TouchableOpacity
                        onPress={
                          () => brandscategories(item)

                        }> */}
                        <Image
                          style={[styles.images, { resizeMode: 'contain' }]}
                          source={
                            item.logo
                              ? { uri: `${Imagepath.Path}${item.logo}` }
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
          </View>
        </View>

        <View
          style={{
            height: hp(5),
            width: '100%',
            backgroundColor: 'white',
            marginVertical: 20,
          }}>
          <View style={[styles.titleContainer]}>
            <Text style={[styles.category]}>Essential Products</Text>
            <Text
              onPress={() => navigation.navigate('Categories', { screen: 'ProductList' })}
              // navigation.navigate('ProductList')}
              style={[
                styles.category,
                {
                  color: '#000000',
                  fontWeight: '400',
                  textDecorationLine: 'underline',
                  fontSize: wp(4),
                  marginRight: 20,
                },
              ]}>
              See All
            </Text>
          </View>
        </View>
        <FlatList
          data={products?.slice(0, 4)}
          // onEndReached={() => {}}
          // onEndReachedThreshold={1}
          numColumns={2}
          keyExtractor={(item, index) => index?.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => handleDetail(item)}  style={styles.cardView}>
                <View style={styles.imgcontainer}>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: 0,
                      left: 5,
                      zIndex: 10,
                      height: hp(3),
                      width: wp(8),
                    }}
                    onPress={() => addWishList(item)}>
                    <AntDesign
                      // name="hearto"
                      name={item.is_wishlist ? "heart" : "hearto"} 
                      style={[
                        styles.iconic,
                        { color: item.is_wishlist ? 'red' : 'grey' },
                      ]}
                    />
                  </TouchableOpacity>

                  <Image
                    style={styles.img}
                    source={{ uri: `${Imagepath.Path}${item.image}` }}
                  />

                </View>
                <Text style={styles.txt3}> {removeHtmlTags(item.name)
                  ?.split('\n')
                  .filter(line => line.trim())[0]
                  ?.substring(0, 30)}{' '}
                  ...{' '}</Text>
                
                  <Text style={styles.txt3}>
                    {removeHtmlTags(item.description)
                      ?.split('\n')
                      .filter(line => line.trim())[0]
                      ?.substring(0, 30)}{' '}
                    ...{' '}
                  </Text>
               
                <View style={styles.priceCOntainer}>
                  {item.special ? (
                    <>
                      <Text style={[styles.Price, { color: 'black' }]}>
                        ₹ {item.special}
                      </Text>
                      <Text
                        style={[
                          styles.Price,
                          {
                            textDecorationLine: 'line-through',
                            fontSize: wp(3),
                            marginTop: 2,
                            fontWeight: 'bold',
                            color: 'red',
                          },
                        ]}>
                        ₹ {item.sale_price || item.price} 
                      </Text>
                    </>
                  ) : (
                    <Text style={[styles.Price, { color: 'black' }]}>
                      ₹ {item.sale_price || item.price} 
                    </Text>
                  )}
                  <Text
                    style={[
                      {
                        fontSize: wp(3),
                        marginTop: 2,
                        fontWeight: 'bold',
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
      </ScrollView>
      {/* </SafeAreaView> */}
      {/* <BottumTab /> */}
    </View>
  );
};
export default Home;
