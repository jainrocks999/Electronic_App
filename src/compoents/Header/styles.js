import { Platform, StyleSheet } from "react-native";
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from "react-native-responsive-screen";
export default StyleSheet.create({
    container:{
       height:hp(10),
       width:'100%',
       alignItems:'center',
       justifyContent:"space-between",
       backgroundColor:'#FFDE4D',
       
      // borderWidth:1
     
      flexDirection:'row'
       
    },
    container2: {
      width: wp(10),
      //marginRight: wp(7),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    search:{
       // borderWidth:1,
        height:'52%',
        width:'80%',
        borderRadius:wp(5),
        backgroundColor:"#f2f5f4",
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:'4%',
        elevation:5,
        shadowColor: 'white',
       shadowOffset: {
         width: 0,
         height: 2,
       },
       shadowOpacity: 0.15,
       shadowRadius: 2.84,
       marginLeft:'4%'
    }
   
})