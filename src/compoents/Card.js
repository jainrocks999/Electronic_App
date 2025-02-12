import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Imagepath from './Imagepath';
import { addwishlist1, productDetail } from '../redux/slice/Homesclice';
const Card = ({item,onPress=()=>{}, sendData}) => {
  const dispatch=useDispatch()
  const navigation = useNavigation();
  const handleDetail =async(item)=>{
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
  await  dispatch(productDetail({  
     user: userid,
      id: item.id,
      token: token,
     
      url:'fetch-single-product',
       navigation,
    }));
  }
  const removeHtmlTags = (str) => {
    return str?.replace(/<\/?[^>]+(>|$)/g, "");
  };

   
    const addWishList = async (item) => {
      const token = await AsyncStorage.getItem('Token');
      const userid = await AsyncStorage.getItem('user_id');
    await  dispatch(addwishlist1({  
       user: userid,
        id: item.id,
        token: token,
        isadd:item.is_wishlist,
        url:'wishlist-product-add',
        // navigation,
      }));
  }
 
  return (

    <TouchableOpacity
    style={styles.cardView}
    onPress={() => handleDetail(item)} // Navigate to detail screen
  >
                
                <View style={styles.imgcontainer}>
                  <TouchableOpacity
                   style={{
                    position: 'absolute', 
                    top: 5,
                    // right: -5,
                    left:-8,zIndex:10,height:hp(2),width:wp(8)
                  }}
                      onPress={() =>  addWishList(item) }
                    >
                    
                    
                      <AntDesign 
                      // name="hearto" 
                      name={item.is_wishlist ? "heart" : "hearto"}
                       style={[styles.iconic,{color:item.is_wishlist?'red':'grey'}]} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                      onPress={() => handleDetail(item)}
                    > */}
                      <Image style={styles.img} source={{ uri: `${Imagepath.Path}${item.image}` }} />
                      {/* </TouchableOpacity> */}
                    
                  </View>
                  <Text style={styles.txt2}>
                    { removeHtmlTags(item.name)?.split('\n').filter(line => line.trim())[0]?.substring(0, 55)} ...
                    </Text>
                  {/* <View > */}
                  <Text style={{ marginTop: 0,  fontFamily:'Mulish-SemiBold', padding:wp(2), fontSize: wp(3.5), fontFamily:'Mulish-SemiBold',}}>
                    { removeHtmlTags(item.description)?.split('\n').filter(line => line.trim())[0]?.substring(0, 75)}
                     ...
                     </Text>
                  {/* </View> */}
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
                          ]}
                        >
                           {item.price}
                        </Text>
                      </>
                    ):(
                      <Text style={[styles.Price, { color: 'black' }]}>
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
                      ]}
                    >
                      Ex Tax: <Text style={{textDecorationLine:'line-through'}}>{item.price}</Text>
                    </Text>
                  </View>
                </TouchableOpacity>
  );
};

export default Card;
const styles=StyleSheet.create({



  conatainer: {
    flex: 1,
    backgroundColor:'white',
    elevation: 1,
    //#FFDE4D
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
    height:hp('7.5%'),
    marginBottom:hp('2%'),
    marginHorizontal:wp('5%'),
    backgroundColor:'white',
    flexDirection:'row',
    borderRadius:hp('.5%'),
    flexDirection:'row',
    borderWidth:0.5,
    borderColor:'lightgrey',
    elevation:1,
    marginTop:'2%',
  },
  picker: {
    width:'17%',
    backgroundColor: '#FFDE4D',
    borderRadius: hp('.50%'),
    alignItems:'center',
    justifyContent: 'center',
    flexDirection:'row',
    margin:'.50%',
  },
  photos: {
    height:hp('30%'),
    width: wp('100%'),
    alignItems:'center',
    //justifyContent: 'center',
    backgroundColor:'#e6f0f2',
    //borderWidth:1
  },
  con:{
    alignItems:'center',
    flexDirection:'row',
    width:'100%',
    // borderWidth: 1,
    height:'100%',
    justifyContent:'center',
    backgroundColor:'white'
  },
  viewcontainer: {
    backgroundColor:'#333',
    height:hp('10%'),
    alignItems: 'center',
    justifyContent:'space-between',
    flexDirection:'row',
    // borderWidth:1
  },
  cicle: {
    height:hp('5%'),
    width:hp('5%'),
    borderRadius:hp('6%'),
    borderWidth:1,
    borderColor:'white',
    alignItems:'center',
    justifyContent:'center',
    borderColor:'rgba(13, 82, 214, 1)',
  },
  historyContainer:{
    margin:'2%',
    width:'20%',
    alignItems:'center',
    justifyContent:'center',
  },
  txt: {
    fontSize: wp(2),
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
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
    //borderWidth:1,
    borderRadius: wp(3),
    backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: {
    //     width: 0,
    //     height: 2,
    // },
    // shadowOpacity: 0.15,
    // shadowRadius: 2.84,
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
    // marginTop:'2%',
    fontSize: wp(3),
  },
  ViewContainer: {
    height: '85%',
    width: '58%',
    //  borderWidth:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  img2: {
    //borderWidth:1,
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    marginTop: '10%',
    // marginLeft: '-7%',
  },
  btn: {
    // borderWidth:1,
    height: '15%',
    width: '28%',
    marginLeft: '-45%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#FFDE4D',
  },
  cardView: {
    // paddingVertical:hp(1),
    // paddingHorizontal:wp(2),
    backgroundColor: '#ffffff',
    marginVertical: wp(1),
     width: wp(47.5),
    marginHorizontal: wp(1),
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
  loadMoreButtonText:{
    color:'black'
  },
  CardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp(1),
    marginHorizontal:wp(2)
  },
  imgcontainer: {
    padding:wp(2),
    height: wp(40),
    width: '80%',
    alignSelf: 'center',
    // marginTop: hp(5),
    resizeMode:'contain'
  },
  imagecontainer: {
    height: wp(20),
    width: wp(30),
    alignSelf: 'center',
    margin:10,
  
  },
  img: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius:wp(2),
    borderTopRightRadius:wp(2)
  },
  images: {
    height: '100%',
    width: '100%',
  },
  txt2: {
    padding:wp(2),
    marginTop: wp(2),
    fontSize: wp(3.5),
    fontFamily:'Mulish-SemiBold',
    color: 'black',
  },
  txt3: {
    padding:wp(2),
    marginTop: wp(2),
    fontSize: wp(4),
    fontFamily:'Mulish-SemiBold',
    color: 'black',
  },
  btn: {
    borderRadius: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: wp(22),
    height: hp(3.5),
    borderColor: 'grey',
    alignSelf:'center',
    marginTop:hp(3),
    backgroundColor:'#FFDE4D'
  },
  priceCOntainer: {
    // marginTop: hp(2),
  },
  Price: {
   marginLeft:wp(2),
    fontSize: wp(5),
  fontFamily:'Mulish-Bold',
    color: 'black',
  },
 
  searchContainer:{
    backgroundColor:"white"
  },
  searchBarContainer:{
    backgroundColor:"white",
    borderBottomColor:"white",
    borderTopColor:"white",
    
  },
  searchBarInputContainer:{
    backgroundColor:"white",
  },
  icon2:{
    fontSize:wp(7),
     position:'absolute',
     top:-hp('69%'),
   },
    iconic:{
      // marginVertical:hp('-10%'),
    fontSize:wp(8),
    position:'absolute',

   
  },
});




// const styles = StyleSheet.create({
//   container: {
//     width: wp(46),
//   paddingVertical:hp(1),
//     // height: wp(60),
//     margin:wp(1),
//     // alignItems: 'center',
//     // justifyContent: 'center',
//     //   borderWidth:1,
//     // alignSelf: 'center',
//   },
//   itemContainer: {
//     paddingVertical:hp(2),
//     width: '100%',
//     backgroundColor: '#e6f0f2',
//     borderRadius: wp(3),
//   },
//   like: {
//     // borderWidth:1,
    
//     // width: '95%',
//     // alignSelf: 'center',
//     // alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     marginTop:hp(0.3),
//   },
//   circle: {
//     height: wp(6),
//     width: wp(6),
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: wp(3),
//     backgroundColor: 'lightgrey',
//     marginRight:3
//   },
//   img: {
//     height: wp(22),
//     width: wp(15),
//     left: '30%',
//   },
//   pr: {
//     width: wp(10),
//     height: wp(5),
//     backgroundColor: 'lightgrey',
//     borderRadius: wp(3),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   prce: {
//     fontSize: wp(3),
//     fontWeight: 'bold',
//     color: 'black',
//     justifyContent:'center',
//     alignSelf: 'center',
//     alignItems: 'center',
//   },
//   imgContainer: {
//     width: '39%',
//     marginTop: '30%',
//   },
//   txt: {
//     alignSelf: 'center',
//     fontSize: 20,
//     color: 'black',
//     justifyContent:'center',
//     alignItems: 'center',
//   },
// });
