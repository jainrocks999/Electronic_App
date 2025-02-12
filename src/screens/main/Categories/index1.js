import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import BottumTab from '../../../compoents/BottumTab';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import he from 'he'; // Import the 'he' library for HTML entity decoding
import Loader from '../../../compoents/Loader';
import Imagepath from '../../../compoents/Imagepath';

const Categories = ({navigation}) => {
  const [show, setShow] = useState({
    acount: false,
    payment: false,
  });
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const data = useSelector(state => state?.home?.Brand);
  const isLoading = useSelector(state => state.home?.loading);

  const [showSubCategories, setShowCategories] = useState(false);
  const dispatch = useDispatch();

  const onHandleList = (name, value) => {
    setShow(prevState => ({...prevState, [name]: value}));
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FCE7C8'}}>
      {isLoading ? <Loader /> : null}
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <View style={styles.back}>
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={wp(5.9)}
              color="#000000"
            />
            <Text style={{fontSize: wp(4.5), color: '#000000', width:'100%', marginLeft:wp(5), fontFamily:'Mulish-Bold'}}>Categories</Text>
          </View>
        </View>
        <ScrollView>
          <FlatList
            data={Array.isArray(data) ? data : []}
            onEndReached={() => {}}
            onEndReachedThreshold={1}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              if (index === 1) {
              }

              return (
                <View style={styles.cardView}>
                  <View style={styles.imgcontainer}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Subcategory1', {item})
                      }>
                      <Image
                        style={[styles.img, {resizeMode: 'contain'}]}
                        source={
                          item?.logo
                            ? {uri: `${Imagepath.Path}${item.logo}`}
                            : require('../../../assests/noimg.jpeg')
                        }
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.txt2}>{item.name}</Text>
                </View>
              );
            }}
          />
        </ScrollView>
      </View>
      {/* <BottumTab /> */}
    </View>
  );
};
export default Categories;
