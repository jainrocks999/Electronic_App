import { StyleSheet } from 'react-native';
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
  back: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth:1,
    width: wp(38),
    alignItems: 'center',
  },

  card: {
    // borderWidth:1,
    width: wp(32),
    height: hp(20),
    margin: wp(0.5),
    borderRadius: wp(3),
    backgroundColor: '#e6f0f2',
  },
  progressBarContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#e6f0f2',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'green',
  },
  item: {
    // borderWidth:1,
    height: hp(6),
    paddingHorizontal: wp(5),
    backgroundColor: '#e6f0f2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f5f4',
  },
  cardCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(50),
    backgroundColor: '#ffffff',
  },
  listContainer: {
    // borderWidth:1,
    width: '99%',
    height: hp(25),
    backgroundColor: '#ffffff',
    marginVertical: wp(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    borderRadius: wp(5)
  },
  imgContainer: {
    height: '85%',
    width: '35%',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  img: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  itemContainer: {
    width: '62%',
    height: '100%',
  },
  Qnt: {
    height: hp(3),
    width: wp(15),
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '2%',
  },
  placeContainer: {
    padding: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    justifyContent: 'space-between'
  },
  btn: {
    marginBottom: 5,
    height: hp(5.5),
    width: wp(45),
    backgroundColor: '#FFDE4D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(1),
  },
  btnText: {
    fontSize: wp(4),
    fontWeight: '500',
    color: '#000000',
  },
});
