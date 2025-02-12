import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/AntDesign"
const Button = ({ name, title, onFocus, ...props }) => {
    const [isFocused, setIsfocused] = useState(true)
 
    return (
        <TouchableOpacity
            style={{
                height: hp('7%'),
                marginVertical: hp('3%'),
                marginHorizontal: wp('3%'),
                backgroundColor: isFocused ? '#FFDE4D':'#0d52d6',
                flexDirection: 'row',
                borderRadius: hp('.50%'),
                flexDirection:'row',
                justifyContent:'center',
            }}
            activeOpacity={1}
            {...props}
            onFocus={() => { setIsfocused(true)}}
            onBlur={() => setIsfocused(false)}
        >
            <Text
                style=
                {{
                    fontSize: hp('3%'),
                    fontWeight: 'bold',
                    color: 'white',
                    alignSelf: "center",
                }}
            >Register</Text>
        </TouchableOpacity>
    )
}
export default Button
const styles = StyleSheet.create({})