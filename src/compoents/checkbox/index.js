import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/Entypo';
const CustomCheckbox = ({ isSelected, onToggle, label }) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, isSelected && styles.checked]}>
        {isSelected && <AntDesign name='check' size={15} color='#FFDE4D' />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    // backgroundColor: '#FFDE4D',
    borderColor:'#FFDE4D' // Change to your desired checked color
  },
  checkedIndicator: {
    width: 12,
    height: 12,
    backgroundColor: '#007AFF', // Change to your desired checked color
    borderRadius: 6,
  },
  label: {
    fontWeight: '700',
  },
});

export default CustomCheckbox;