import React from "react";
import { Image, SafeAreaView,Text,View,StatusBar,Platform,TextInput} from 'react-native'
import styles from "./styles";
import Ionicons from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useNavigation, StackActions } from "@react-navigation/native";
  const Header = () => {
  const navigation = useNavigation()
return (
    <View style={{ width: '100%', backgroundColor: '#FFDE4D', }}>
      <View style={[styles.container]}>
        <Feather onPress={()=>navigation.openDrawer()}name='menu'style={{fontSize: wp(8), marginLeft: '2%', color: '#000000' }} />
        <View
          style={{
           
            alignItems: 'center',
            alignContent: "center",
            justifyContent: 'center',
          }}>
          <Image
            style={{
              height: hp(10),
              width: wp(40),
              resizeMode:'contain',
              tintColor:'#000000',
            }}
            source={require('../../assests/ecom.png')}
          />
        </View>
        <View style={[styles.container2,]}>
          <AntDesign
            name="search1"
            onPress={() => navigation.navigate('Searchbar')}
            size={wp(5.6)}
            color="#000000"
          />
        </View>
        {/* <View style={{
                height: '52%',
                width: '11%',
                //borderWidth: 1,
                marginLeft: "6%",
                borderRadius: 8,
                alignItems: "center",
                justifyContent: 'center',
                backgroundColor: "#ebeded",
                elevation: 4,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.15,
                shadowRadius: 2.84,
            }}>
                <Ionicons name='bell' size={wp(6)} color='grey' />
            </View> */}
      </View>
    </View>
  )
}
export default Header