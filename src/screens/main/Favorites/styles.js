import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  header: {
    height: hp(7),
    backgroundColor: '#FFDE4D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  txt: {
    fontSize: wp(4.5),
    marginLeft:wp(3),
    color: '#000000',
  },
  bag: {
    width: wp(20),
    height: hp(4.5),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
