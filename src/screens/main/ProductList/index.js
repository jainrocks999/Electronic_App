import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import BottumTab from '../../../compoents/BottumTab';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import he from 'he';
import Loader from '../../../compoents/Loader';
import Imagepath from '../../../compoents/Imagepath';
import {
  addwishlist1,
  product,
  productDetail,
} from '../../../redux/slice/Homesclice';
const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // const detail = useSelector(state => state.data.productDetails);
  const products = useSelector(state => state.home?.product);
  const isLoading = useSelector(state => state.home.loading);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(products);
  const [limit, setLimit] = useState(10);

  const productsonReached = async () => {};

  useEffect(() => {
    apicall();
  }, []);

  const apicall = async () => {
    try {
      // Retrieve token and user_id from AsyncStorage
      const token = await AsyncStorage.getItem('Token');
      const userid = await AsyncStorage.getItem('user_id');

      if (!token || !userid) {
        console.error('Token or User ID is missing.');
        return;
      }

      await dispatch(product({id: userid, token: token, url: 'products'}));
    } catch (error) {
      console.error('Error in API call:', error);
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
        // navigation,
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

  const handleSearch = text => {
    setSearchQuery(text);
  };
  const filteredProducts = products?.filter(product => {
    const productName = product.name.toLowerCase();
    const search = searchQuery.toLowerCase();
    return productName.includes(search);
  });
  const removeHtmlTags = str => {
    return str?.replace(/<\/?[^>]+(>|$)/g, '');
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {isLoading || loading ? <Loader /> : null}
      <View style={styles.conatainer}>
        {/* <View style={{backgroundColor:'#FFDE4D'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={wp(5)}
              color="white"
            />
            <Text style={styles.txt}>Product List</Text>
          </View>
        </View> */}
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
                      <Text style={styles.txt}>Product List</Text>
                    </View>
                  </View>
                  <View style={{marginLeft: wp(45)}}></View>
                </View>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search..."
            onChangeText={handleSearch}
            value={searchQuery}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInputContainer}
            inputStyle={styles.searchBarInput}
          />
        </View>
        {filteredProducts == 0 ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:5,s}}>
            <Text>{'No result found'}</Text>
          </View>
        ) : (
          <FlatList
            data={filteredProducts}
            // onEndReached={() => productsonReached()}
            // onEndReachedThreshold={1}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => handleDetail(item)} style={styles.cardView}>
                  <View style={styles.imgcontainer}>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 5,
                        right: 0,
                        left: 0,
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
                          {color: item.is_wishlist ? 'red' : 'grey'},
                        ]}
                      />
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => handleDetail(item)}> */}
                      <Image
                        style={styles.img}
                        source={{uri: `${Imagepath.Path}${item.image}`}}
                      />
                    {/* </TouchableOpacity> */}
                  </View>
                  <Text style={styles.txt2}> {removeHtmlTags(item.name)
                        ?.split('\n')
                        .filter(line => line.trim())[0]
                        ?.substring(0, 30)}{' '}
                      ...{' '}</Text>
                  
                    <Text style={{marginTop:5}}>
                      {removeHtmlTags(item.description)
                        ?.split('\n')
                        .filter(line => line.trim())[0]
                        ?.substring(0, 30)}{' '}
                      ...{' '}
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
        )}
      </View>
      {/* <BottumTab /> */}
    </View>
  );
};

export default ProductList;
