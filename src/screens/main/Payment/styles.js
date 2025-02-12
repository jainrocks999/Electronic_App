import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0f2',
  },
  header: {
    height: hp(7),
    backgroundColor: '#e6f0f2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },
  txt: {
    fontSize: wp(4),
    color: 'grey',
  },
  lable: {
    height: hp(3),
    backgroundColor: 'pink',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
  },
  discount: {
    paddingVertical: wp(3),
    backgroundColor: '#f2f5f4',
    marginTop: wp(3),
    paddingHorizontal: wp(3),
  },
  textIcon: {
    fontSize: wp(5),
    color: 'grey',
    fontWeight: '500',
  },
  btnText: {
    marginTop: wp(2),
    backgroundColor: '#f2f5f4',
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: wp(5),
  },
});
