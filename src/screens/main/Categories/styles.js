import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
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
    color: '#000000',
    marginLeft:wp(4)
  },
  back: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth:1,
    width: wp(30),
    alignItems: 'center',
  },
  cardView: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    backgroundColor: '#ffffff',
    margin: wp(1),
    // marginVertical: wp(1),
    width: wp(48),
    // marginHorizontal: wp(1),
    borderRadius: wp(2),
    shadowColor: 'black',
    shadowOpacity: 0.05,

    // backgroundColor: '#e6f0f2',
    // marginVertical: wp(1),
    // width: wp(46),
    // marginHorizontal: wp(2),
    // borderRadius: wp(2),
    // shadowColor: 'black',
    // shadowOpacity: 0.05,
    //  marginTop:10,
  },
  card: {
    // borderWidth:1,
    width: wp(30),
    height: hp(20),
    margin: wp(0.5),
    borderRadius: wp(3),
    backgroundColor: '#e6f0f2',
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode:'contain'
  },
  imgcontainer: {
    height: wp(30),
    width: wp(40),
    alignSelf: 'center',
    marginTop: hp(1),
  },
  txt2: {
    alignSelf: 'center',
    marginVertical: hp(2),
    fontSize: wp(3.5),
   fontFamily:'Mulish-SemiBold',
    color: 'black',
  },
});
