// import {Platform, StyleSheet} from 'react-native';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FCE7C8',
//   },
//   input: {
//     borderWidth: wp(0.2),
//     marginHorizontal: wp(10),
//     marginLeft: 0,
//     margin: 20,
//     marginTop: wp(3),
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: 'grey',
//     paddingVertical: Platform.OS === 'ios' ? wp(2.8) : 0,
//     borderRadius: wp(2),
//     paddingLeft: wp(3),
//     paddingRight: wp(25),
//     overflow: 'hidden',
//   },
//   icon: {
//     fontSize: wp(6),
//     color: 'grey',
//     fontStyle: 'italic',
//   },
//   textInput: {
//     fontSize: wp(5),
//     marginLeft: wp(3),
//     color: 'grey',
//     // fontStyle: 'italic'
//   },
//   list: {
//     height: hp(18),
//     marginHorizontal: wp(3),
//     marginVertical: wp(2),
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   flatList: {
//     marginTop: wp(3),
//   },
//   imgContainer: {
//     width: wp(40),
//     height: '100%',
//   },
//   img: {
//     height: '100%',
//     width: '100%',
//   },
//   priceCOntainer: {
//     // flexDirection: 'row',
//     alignItems: 'center',

//     //justifyContent:'space-between',
//     marginTop: wp(2),
//     alignSelf: 'center',
//   },
//   Price: {
//     fontSize: wp(4),
//     alignSelf: 'center',
//     fontWeight: '500',
//     color: 'black',
//   },
//   cardView: {
//     paddingVertical: hp(1),
//     paddingHorizontal: wp(2),
//     backgroundColor: '#e6f0f2',
//     marginVertical: wp(1),
//     width: wp(46),
//     marginHorizontal: wp(2),
//     borderRadius: wp(2),
//     shadowColor: 'black',
//     shadowOpacity: 0.05,
//   },
//   txt2: {
//     alignSelf: 'center',
//     marginTop: wp(2),
//     fontSize: wp(4),
//     fontWeight: '500',
//     color: 'black',
//   },
//   imgcontainer: {
//     height: wp(40),
//     width: '100%',
//     // alignSelf: 'center',
//     // marginTop: wp(10),
//   },

//   title: {
//     fontSize: wp(4),
//     textAlign: 'center',

//     width: wp(20),
//     fontWeight: '600',
//     color: 'black',
//     fontStyle: 'italic',
//   },
//   price: {
//     fontSize: wp(4),
//     textAlign: 'center',
//     marginLeft: wp(3),
//     width: wp(50),
//     fontWeight: '600',
//     color: 'black',
//     marginTop: wp(2),
//     fontStyle: 'italic',
//   },
//   iconic: {
//     // marginVertical:hp('-10%'),
//     fontSize: wp(8),
//     position: 'absolute',
//   },
// });
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCE7C8',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(4),
  },
  backIcon: {
    marginRight: wp(2),
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    height: hp(6),
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchIcon: {
    fontSize: wp(5),
    color: 'grey',
    marginRight: wp(2),
  },
  textInput: {
    flex: 1,
    fontSize: wp(4),
    color: '#000',
  },
  noResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardView: {
    width: wp(46),
    backgroundColor: '#e6f0f2',
    borderRadius: wp(2),
    margin: wp(2),
    padding: wp(3),
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  wishlistBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  img: {
    width: '100%',
    height: hp(20),
    borderRadius: wp(2),
  },
  productName: {
    fontSize: wp(4),
    fontWeight: '500',
    textAlign: 'center',
    marginTop: hp(1),
  },
  price: {
    fontSize: wp(4),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp(0.5),
    color: 'green',
  },
});
