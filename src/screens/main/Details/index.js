import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  alert,
  Alert,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import Input from '../../../compoents/Input';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from './styles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BottumTab from '../../../compoents/BottumTab';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';
import { WebView } from 'react-native-webview';
import CheckBox from 'react-native-check-box';
import CustomCheckbox from '../../../compoents/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import he from 'he';
import DocumentPicker from 'react-native-document-picker';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../../../compoents/Loader';
import Imagepath from '../../../compoents/Imagepath';
import {
  addToCard,
  addwishlist1,
  brandcategory,
  productDetail,
  productsbycategories,
  searchQ,
} from '../../../redux/slice/Homesclice';

const removeHtmlTags = str => {
  return str?.replace(/<\/?[^>]+(>|$)/g, '') || ''; // Remove HTML tags
};

const Details = ({ route, navigation }) => {
  const [quantity, setQuantity] = useState('');
  const detail = useSelector(state => state.home?.ProductDetails[0]);
  const quant = useSelector(state => state?.home?.addToCard1)
  const isLoading = useSelector(state => state.home?.loading);

  const [readTxt, setreadTxt] = useState(false);
  const option = detail?.options;

  let img1 = [];
  detail?.images?.forEach(item => {
    let image = `${Imagepath.Path}${item}`;
    img1.push(image);
  });


  const dispatch = useDispatch();
  const addCart = async () => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    await dispatch(
      addToCard({
        user: userid,
        id: detail?.id,
        qty: 1,
        // qty:quant?.qty==undefined? 1:quant?.qty+1,
        token: token,

        url: 'add-to-cart',
        //  navigation,
      }),
    );
  };
  const [rating, setRating] = useState(1);
  const [isSelected, setSelection] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState({});

  const toggleSelection = optionId => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionId]: !prev[optionId],
    }));
  };

  const [message, setMessage] = useState('');
  const [textarea, settextarea] = useState('');

  const [Time, settime] = useState('');
  const [Uploadfile, setuploadfile] = useState('');
  const [Timedate, settimedate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [open, setOpen] = useState(false);
  const [dob, setDob] = useState('');
  const [date, setDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [dateInputValue, setDateInputValue] = useState('');
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setSelectedDate(currentDate);
    setDateInputValue(currentDate.toISOString());
  };
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const [fileResponse, setFileResponse] = useState(null);
  const [image1, setImage1] = useState('');

  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setFileResponse(response);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const [isLoading1, setIsLoading] = useState(false);
  const addWishList = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('Token');
      const userid = await AsyncStorage.getItem('user_id');
      const query = await AsyncStorage.getItem('query');

      await dispatch(
        addwishlist1({
          user: userid,
          id: detail.id,
          token: token,
          isadd: detail.is_wishlist,
          url: 'wishlist-product-add',
        }),
      );

      {
        isLoading == false
          ? await dispatch(
            brandcategory({
              user: userid,
              id: detail.brand_id,
              token: token,

              url: 'brand-by-product',
              navigation,
              nav: false,
            }),
          )
          : null;
      }
      {
        query != null
          ? dispatch(
            searchQ({
              userid: userid,
              q: query,
              url: 'products-search',
              token: token,
            }),
          )
          : null;
      }
      handleDetail();
      {
        isLoading == false ? hanndleProduct() : null;
      }
    } catch (error) {
      console.error('Error in adding wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const hanndleProduct = async item => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');

    await dispatch(
      productsbycategories({
        id: userid,
        token: token,
        category: detail?.p_category_id,
        url: 'category-by-product',
        navigation,
      }),
    );
  };

  const handleDetail = async () => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    await dispatch(
      productDetail({
        user: userid,
        id: detail?.id,
        token: token,

        url: 'fetch-single-product',
        navigation,
      }),
    );
  };

  const getProcessedText = () => {
    const text = removeHtmlTags(detail?.description)
      ?.split('\n')
      ?.filter(line => line.trim())[0];

    return !readTxt ? text?.substring(0, 60) + '...' : text;
  };

  const handleImagePress = index => {
    const pressedImageUrl = img1[index];
    console.log('dahndhdsa', pressedImageUrl);
    setSelection(true);
    setQuantity(pressedImageUrl);
    //  Alert.alert(`Image URL: ${pressedImageUrl}`);
  };
  const removeHtmlTags = str => {
    return str?.replace(/<\/?[^>]+(>|$)/g, '');
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#FCE7C8' }}>
      {isLoading || isLoading1 ? <Loader /> : null}
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
            <Text style={{ fontSize: wp(4.5), color: '#000000', width: '100%', marginLeft: wp(5), fontFamily: 'Mulish-Bold' }}>
              Categories Detail
            </Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: wp(10) }}>
        <View style={{ marginTop: hp(2), elevation: 2 }}>
          <SliderBox
            style={{

              height: hp(40),
              width: wp(90),
              borderRadius: wp(12),
              alignSelf: 'center',
              backgroundColor: 'white',

            }}
            images={img1}
            resizeMode="contain"

            dotColor="#fddae8"
            inactiveDotColor="#cccccc"
            ImageComponentStyle={{

            }}
            onCurrentImagePressed={index => handleImagePress(index)}
            dotStyle={{
              width: wp(5),
              height: wp(5),
              borderRadius: 15,
            }}
            imageLoadingColor="#2196F3"
          />
        </View>

        <View style={styles.details}>
          <View
            style={[
              styles.name,
              {
                marginLeft: 20,
                backgroundColor: '#ffffff',
                width: '70%'
              },
            ]}>
            <Text style={{ fontSize: wp(4), fontFamily: 'Mulish-SemiBold', color: 'black', paddingLeft: wp(-2) }}>

              {removeHtmlTags(detail?.name)
                ?.split('\n')
                .filter(line => line.trim())[0]
                ?.substring(0, 30)}{' '}
              ...{' '}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',

              marginHorizontal: 20,
            }}>
            <View>
              <Text style={{ fontSize: wp(4), color: 'black', paddingLeft: wp(3) }}>
                ₹ {parseFloat(detail?.sale_price).toFixed(2)}
              </Text>
              <Text
                style={[
                  styles.prDeta,
                  { flexDirection: 'row', alignItems: 'center', paddingLeft: wp(2) },
                ]}>
                <Text style={{ textDecorationLine: 'line-through', paddingLeft: wp(2) }}>
                  ₹ {parseFloat(detail?.price).toFixed(2)}{' '}
                </Text>{' '}
                MRP incl.of all taxes
              </Text>
            </View>
            <View
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={[styles.btn3, { height: hp(5), width: wp(33) }]}
                onPress={() => {
                  addCart();
                }}>
                <Text
                  style={{ fontSize: wp(3.5), fontFamily: 'Mulish-SemiBold', color: '#000000' }}>
                  ADD TO CART
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  // position: 'absolute',
                  // top: 15,
                  // right: 0,
                  // left:15,zIndex:10,
                  height: hp(5),
                  width: wp(8),
                  marginLeft: wp(3),
                }}
                onPress={() => addWishList()}>
                <AntDesign
                  // name="hearto"
                  name={detail?.is_wishlist ? 'heart' : 'hearto'}
                  style={[
                    styles.iconic,
                    {
                      fontSize: wp(8),
                      color: detail?.is_wishlist ? 'red' : 'grey',
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginTop: hp(2),
            }}>
            <Text style={{ fontSize: wp(4), color: 'black', paddingLeft: wp(2) }}>
              Availability - {detail?.stock_status?.label}
            </Text>
          </View>


          <View
            style={[
              styles.description,
              { paddingHorizontal: 5, fontSize: wp(15), paddingLeft: wp(6) },
            ]}
          >
            <Text
              style={{
                fontFamily: 'Mulish-Bold',
                fontSize: wp(4),
                marginBottom: 10,
                paddingLeft: wp(1),
              }}
            >
              Description
            </Text>
            <View style={styles.container1}>
              <Text style={styles.contentText1}>
                {getProcessedText()}{' '}
                <Text
                  onPress={() => setreadTxt(prev => !prev)}
                  style={[
                    styles.toggleText1,
                    { color: '#FFDE4D', textDecorationLine: 'underline' }, // Add styles for better visibility
                  ]}
                >
                  {!readTxt ? 'Show More..' : 'Show Less..'}
                </Text>
              </Text>
            </View>
          </View>



        </View>
      </ScrollView>

      <DatePicker
        modal
        open={open}
        date={date}
        // date={new Date()}
        mode={'date'}
        maximumDate={new Date()}
        onConfirm={date => {
          setOpen(false);
          var d = date;
          (month = '' + (d.getMonth() + 1)),
            (day = '' + d.getDate()),
            (day1 = '' + d.getDate() + 1),
            (year = d.getFullYear());

          if (month.length < 2) month = '0' + month;

          if (day.length < 2) day = '0' + day;

          var finalDate = [day, month, year].join('/');
          setDob(finalDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <Modal
        // animationType="slide"
        // transparent={false}
        visible={isSelected}
        onRequestClose={() => setSelection(false)} // Close modal on back press
      >
        <View style={styles.modalContainer}>
          <Image
            source={{ uri: quantity }}
            style={styles.fullImage} // Full-screen style
            resizeMode="contain" // Adjusts the image to fit within the screen
          />
          <TouchableOpacity
            style={styles.closeButton1}
            onPress={() => setSelection(false)}>
            <Text
              style={{ fontSize: wp(4.5), color: '#fff', textAlign: 'right' }}>
              cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        {/* {isLoading ? <Loader /> : null} */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Close Icon */}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={[styles.closeButton, { zIndex: 10 }]}>
              <Text style={{ fontSize: wp(4.5), color: 'grey' }}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Enter Details</Text>

            {/* Name Field */}

            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 18,
                  marginLeft: 10,
                  marginVertical: 5,
                }}>
                Description
              </Text>
              <TextInput
                style={{
                  // height: hp(0),
                  width: '100%',
                  borderRadius: 5,
                  marginTop: 10,

                  paddingHorizontal: 15,
                  borderWidth: 0.5,
                }}
                placeholder="Textarea"
                label="Text"
                value={textarea}
                multiline={true}
                onChangeText={text => settextarea(text)}
              />
            </View>
            <View style={{ marginTop: hp(4), alignItems: 'center' }}>
              <TouchableOpacity
                style={[styles.btn3, { height: hp(5), width: wp(33) }]}
                onPress={() => {
                  console.log();
                }}>
                <Text
                  style={{ fontSize: wp(4), fontWeight: '500', color: 'white' }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* <BottumTab /> */}
    </View>
  );
};
export default Details;
