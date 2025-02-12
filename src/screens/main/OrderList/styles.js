import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    backgroundColor:'#FCE7C8',
    flex: 1,
  },
  header: {
    height: hp(7),
    backgroundColor: '#FFDE4D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    // shadowColor: 'black',
    // shadowOffset: {width: -2, height: 4},
    // shadowOpacity: 1,
    // shadowRadius: 3,
    // elevation: 2,
  },

  txt: {
    width:'85%',
    marginLeft:wp(4),
    fontFamily:'Mulish-Bold',
    fontSize: wp(5),
    color: '#000000',
  },
  listCard: {
    height: hp(20),
    backgroundColor: 'white',
    marginVertical: wp(1),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
  img: {
    height: hp(12),
    width: hp(8),
  },
});
