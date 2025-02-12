import React, { useState } from 'react';
import {Text, View, TextInput} from 'react-native';
import styles from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
const Input = ({lable, notlable, lable2, notInput, ...props}) => {
  const [txt,setTxt] = useState()
  const sentTxt =(txt)=>{
  setTxt(txt)
    props.getTxt(txt)
  }
  return (
    <View
      style={[
          styles.inputfield,
          notInput && {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: wp(4),
        },
      ]}>
      {!notInput ? (
        <TextInput style={{fontSize: wp(4), flex: 1}} {...props}
        keyboardType={props.type === 'number-pad' ? 'number-pad' : 'default'}
        value={txt}
        onChangeText={txt=>sentTxt(txt)}   />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: wp(4)}}>Country</Text>
          <Entypo name="chevron-down" size={wp(6)} />
        </View>
      )}
    </View>
  );
};
export default Input;
