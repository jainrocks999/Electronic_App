import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottumTab from '../../../compoents/BottumTab';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {Image} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../compoents/Loader';
import Imagepath from '../../../compoents/Imagepath';
import {
  addwishlist1,
  productDetail,
  productsbycategories,
} from '../../../redux/slice/Homesclice';
const Subcategory2 = ({route}) => {
  const navigation = useNavigation();

  const isLoading = useSelector(state => state?.home?.loading);
  const product = useSelector(state => state.home.catbyproduct);
  
 

  const dispatch = useDispatch();

  const addWishList = async item => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    await dispatch(
      addwishlist1({
        user: userid,
        id: item.id,
        token: token,
        isadd: item.is_wishlist,
        // category:item.category_id,
        url: 'wishlist-product-add',
        // navigation,
      }),
    );

    console.log('item.is_wishlist,', item.is_wishlist);

    {
      isLoading == false
        ? await dispatch(
            productsbycategories({
              id: userid,
              token: token,
              category: item.category_id,
              url: 'category-by-product',
              navigation,
            }),
          )
        : null;
    }
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

  //   const filteredProducts = products.filter((product) =>{
  //   const productName = product.name.toLowerCase();
  // });

  const removeHtmlTags = str => {
    return str?.replace(/<\/?[^>]+(>|$)/g, '');
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FCE7C8'}}>
      {isLoading ? <Loader /> : null}
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
            color="white"
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
          marginTop: hp(1),
          padding:wp(1)
        }}>
        {product != 0 ? (
          <FlatList
            data={product}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
             
              return (
                <TouchableOpacity onPress={() => handleDetail(item)} style={styles.cardView}>
                  <View style={styles.imgcontainer}>
                    <TouchableOpacity
                      style={{
                        // position: 'absolute',
                        // top: 5,
                        right: 0,
                        left: 0,
                        zIndex: 10,
                        height: hp(3.5),
                        width: '100%',
                        backgroundColor: '#ffffff',
                        borderTopRightRadius: wp(2),
                        borderTopLeftRadius: wp(2),
                      }}
                      onPress={() => addWishList(item)}>
                      <AntDesign
                        // name="hearto"
                        name={item.is_wishlist ? "heart" : "hearto"}
                        style={[
                          styles.iconic,
                          {
                            color: item.is_wishlist ? 'red' : 'grey',
                            marginLeft: '4%',
                            marginTop: hp(0.2),
                          },
                        ]}
                      />
                    </TouchableOpacity>
                  
                      <Image
                        style={styles.img}
                       
                        source={{uri: `${Imagepath.Path}${item.images}`}}
                      />
                   
                  </View>
                  <Text style={styles.txt2}> {removeHtmlTags(item.name)
                        ?.split('\n')
                        .filter(line => line.trim())[0]
                        ?.substring(0, 30)}
                      ...{' '}</Text>
                  {/* <View style={{marginTop: 5,  paddingLeft: wp(2), fontFamily:'Mulish-SemiBold'}}> */}
                    <Text style={{paddingLeft: wp(2), fontFamily:'Mulish-SemiBold', minHeight:wp(10), fontSize:wp(3.5)}}>
                      {removeHtmlTags(item.description)
                        ?.split('\n')
                        .filter(line => line.trim())[0]
                        ?.substring(0, 25)}
                      ...{' '}
                    </Text>
                  {/* </View> */}
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
                        ₹ {item.sale_price}
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
                      <Text style={{textDecorationLine: 'line-through'}}>
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
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>{'No product found'}</Text>
          </View>
        )}
      </View>
      {/* <BottumTab /> */}
    </View>
  );
};

export default Subcategory2;
const styles = StyleSheet.create({
  header: {
    height: hp(7),
    backgroundColor: '#FFDE4D',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    flexDirection: 'row',
  },
  txt: {
    fontSize: wp(4.5),
    color: 'white',
  },
  cardView: {
    backgroundColor: '#ffffff',
    margin: wp(1),
    width: wp(47),
    borderRadius: wp(2),
    shadowColor: 'black',
    shadowOpacity: 0.05,
    padding:wp(1)
  },
  cardsView: {
    backgroundColor: '#ffffff',
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
    // alignSelf: 'center',
    // marginTop: hp(5),
  },
  imagecontainer: {
    height: wp(20),
    width: wp(30),
    // alignSelf: 'center',
    // margin:10,
  },
  img: {
    height: '100%',
    width: '100%',
     resizeMethod:'contain'
  },

  txt2: {
    paddingLeft: wp(2),
    marginTop: hp(5),
    fontSize: wp(3.5),
   fontFamily:'Mulish-SemiBold',
    color: 'black',
    minHeight:wp(13)
  },
  priceCOntainer: {
    marginTop: hp(2),
    paddingLeft: wp(2),
  },
  Price: {
    fontSize: wp(5),
    fontWeight: '500',
    color: 'black',
  },

  
  iconic: {
    // marginVertical:hp('-10%'),
    fontSize: wp(6.7),
    position: 'absolute',
  },
});
