// import React, {useEffect, useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Keyboard,
// } from 'react-native';
// import styles from './styles';
// import BottumTab from '../../../compoents/BottumTab';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/AntDesign';
// import {useDispatch, useSelector} from 'react-redux';
// import Loader from '../../../compoents/Loader';
// import {call} from 'redux-saga/effects';
// import {
//   addwishlist1,
//   productDetail,
//   searchQ,
// } from '../../../redux/slice/Homesclice';
// import Imagepath from '../../../compoents/Imagepath';
// const SearchBar = ({navigation, route}) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const products = useSelector(state => state.home?.searchQu);

//   const isLoading = useSelector(state => state.home?.loading);
//   const [input, setInput] = useState('');
//   const seachText = route.params?.searchText;
//   const dispatch = useDispatch();
//   const typingTimeoutRef = useRef(null);


//   const handleInputChange = text => {
//     // Clear the previous timeout when the user types again
//     if (typingTimeoutRef.current) {
//       clearTimeout(typingTimeoutRef.current);
//     }

//     // Set a new timeout to call the API after a delay
//     typingTimeoutRef.current = setTimeout(() => {
//       if (text.trim() === '') {
//       } else {
//         // Hide the keyboard and call the search API after delay
//         Keyboard.dismiss();
//         handleSearchbar(text);
//       }
//     }, 1500); // Adjust delay (500ms) as per your requirement
//   };
//   const handleSearchbar = async text => {
//     if (text.trim() === '') {
//       return;
//     } else {
//       setInput(text);
//       const token = await AsyncStorage.getItem('Token');
//       const userid = await AsyncStorage.getItem('user_id');
//       dispatch(
//         searchQ({
//           userid: userid,
//           q: text,
//           url: 'products-search',
//           token: token,
//         }),
//       );
//     }
//   };

//   const addWishList = async item => {
//     const token = await AsyncStorage.getItem('Token');
//     const userid = await AsyncStorage.getItem('user_id');
//     await dispatch(
//       addwishlist1({
//         user: userid,
//         id: item.id,
//         token: token,
//         isadd: item.is_wishlist,
//         url: 'wishlist-product-add',
//         // navigation,
//       }),
//     );
//     {
//       isLoading == false
//         ? dispatch(
//             searchQ({
//               userid: userid,
//               q: input,
//               url: 'products-search',
//               token: token,
//             }),
//           )
//         : null;
//     }
//   };
//   const handleDetail = async item => {
//     const token = await AsyncStorage.getItem('Token');
//     const userid = await AsyncStorage.getItem('user_id');
//     await dispatch(
//       productDetail({
//         user: userid,
//         id: item.id,
//         token: token,
//         input: input,
//         url: 'fetch-single-product',
//         navigation,
//       }),
//     );
//   };

//   const removeHtmlTags = str => {
//     return str?.replace(/<\/?[^>]+(>|$)/g, '');
//   };
//   return (
//     <View style={{flex: 1, backgroundColor: '#FCE7C8'}}>
//       {isLoading ? <Loader /> : null}
//       <View style={styles.container}>
//         <View
//           style={{
//             flexDirection: 'row',
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               paddingHorizontal: 20,
//             }}>
//             <AntDesign
//               onPress={() => navigation.goBack()}
//               name="arrowleft"
//               size={wp(5)}
//               color="grey"
//             />
//           </View>
//           <View style={styles.input}>
//             <Icon name="search1" style={styles.icon} />
//             <TextInput
//               style={styles.textInput}
//               placeholderTextColor={'grey'}
//               placeholder="Search Products"
//               returnKeyType="done"
//               // onChangeText={text => {setInput(text);
//               //   handleSearchbar(text);
//               // }}
//               onChangeText={text => handleInputChange(text)}
//             />
//           </View>
//         </View>
//         {input.trim() === '' || products == undefined ? ( // Check if input is empty
//           <View
//             style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//             <Text>No search query entered</Text>
//           </View>
//         ) : (
//           <FlatList
//             data={products}
//             // onEndReached={() => productsonReached()}
//             // onEndReachedThreshold={1}
//             numColumns={2}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({item, index}) => {
//               return (
//                 <View style={styles.cardView}>
//                   <View style={styles.imgcontainer}>
//                     <TouchableOpacity
//                       style={{
//                         position: 'absolute',
//                         top: 5,
//                         right: 0,
//                         left: 5,
//                         zIndex: 10,
//                         height: hp(3),
//                         width: wp(8),
//                       }}
//                       onPress={() => addWishList(item)}>
//                       <AntDesign
//                         name="hearto"
//                         style={[
//                           styles.iconic,
//                           {color: item.is_wishlist ? 'red' : 'grey'},
//                         ]}
//                       />
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => handleDetail(item)}>
//                       <Image
//                         style={styles.img}
//                         source={{uri: `${Imagepath.Path}${item.images}`}}
//                       />
//                     </TouchableOpacity>
//                   </View>
//                   <Text style={styles.txt2}>{item.name}</Text>
//                   <View style={{marginTop: 15, marginHorizontal: 5}}>
//                     <Text>
//                       {removeHtmlTags(item.description)
//                         ?.split('\n')
//                         .filter(line => line.trim())[0]
//                         ?.substring(0, 40)}{' '}
//                       ...
//                     </Text>
//                   </View>
//                   <View style={styles.priceCOntainer}>
//                     {item.special ? (
//                       <>
//                         <Text style={[styles.Price, {color: 'black'}]}>
//                           {item.special}
//                         </Text>
//                         <Text
//                           style={[
//                             styles.Price,
//                             {
//                               textDecorationLine: 'line-through',
//                               fontSize: wp(3),
//                               fontWeight: 'bold',
//                               marginLeft: wp(1),
//                               color: 'red',
//                             },
//                           ]}>
//                           {item.price}
//                         </Text>
//                       </>
//                     ) : (
//                       <Text style={[styles.Price, {color: 'black'}]}>
//                         {item.sale_price}
//                       </Text>
//                     )}
//                     <Text
//                       style={[
//                         styles.Price,
//                         {
//                           fontSize: wp(3),
//                           fontWeight: 'bold',
//                           marginTop: 5,
//                           marginBottom: 10,
//                           color: 'grey',
//                         },
//                       ]}>
//                       Ex Tax:{' '}
//                       <Text style={{textDecorationLine: 'line-through'}}>
//                         {item.price}
//                       </Text>
//                     </Text>
//                   </View>
//                 </View>
//               );
//             }}
//           />
//         )}
//       </View>
//       {/* <BottumTab /> */}
//     </View>
//   );
// };
// export default SearchBar;


import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Keyboard,
  Dimensions
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../compoents/Loader';
import { searchQ, addwishlist1, productDetail } from '../../../redux/slice/Homesclice';
import Imagepath from '../../../compoents/Imagepath';
const { width } = Dimensions.get("window");
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const SearchBar = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [input, setInput] = useState('');
  const typingTimeoutRef = useRef(null);
  const products = useSelector(state => state.home?.searchQu);
  const isLoading = useSelector(state => state.home?.loading);

  const handleInputChange = text => {
    setInput(text);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      if (text.trim() !== '') {
        Keyboard.dismiss();
        handleSearchbar(text);
      }
    }, 1000);
  };

  const handleSearchbar = async text => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    dispatch(
      searchQ({
        userid,
        q: text,
        url: 'products-search',
        token,
      }),
    );
  };

  const addWishList = async item => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    await dispatch(
      addwishlist1({
        user: userid,
        id: item.id,
        token,
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
        token,
        input,
        url: 'fetch-single-product',
        navigation,
      }),
    );
  };

  const removeHtmlTags = str => {
    return str?.replace(/<\/?[^>]+(>|$)/g, '');
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <View style={styles.searchContainer}>
        <AntDesign
          onPress={() => navigation.goBack()}
          name="arrowleft"
          size={24}
          color="grey"
          style={styles.backIcon}
        />
        <View style={styles.inputWrapper}>
          <AntDesign name="search1" style={styles.searchIcon} />
          <TextInput
            style={styles.textInput}
            placeholderTextColor={'grey'}
            placeholder="Search Products"
            returnKeyType="done"
            onChangeText={handleInputChange}
          />
        </View>
      </View>

      {input.trim() === '' || products == undefined ? (
        <View style={styles.noResults}>
          <Text>No search query entered</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardView}>
              <TouchableOpacity onPress={() => addWishList(item)} style={styles.wishlistBtn}>
                <AntDesign
                  // name="hearto"
                  name={item.is_wishlist ? "heart" : "hearto"}
                  style={[
                    styles.icon,
                    {
                      color: item.is_wishlist ? 'red' : 'grey',
                      fontSize: 24 // Aap yahan fontSize apne requirement ke hisaab se adjust kar sakte hain
                    }
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDetail(item)}>
                <Image
                  style={styles.img}
                  source={{ uri: `${Imagepath.Path}${item.images}` }}
                />
              </TouchableOpacity>
              {/* <Text style={styles.productName}>{item.name}</Text> */}
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
              {/* <Text style={styles.price}>{item.special ? item.special : item.sale_price}</Text> */}
              <View style={styles.priceCOntainer}>
                {item.special ? (
                  <>
                    <Text style={[styles.Price, { color: 'black' }]}>
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
                  <Text style={[styles.Price, { color: 'black' }]}>
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
            </View>
          )}
        />
      )}
    </View>
  );
};

export default SearchBar;
