// import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
// import React from 'react';
// import { BlurView } from '@react-native-community/blur';

// // const Loader = ({ visible = true }) => {
//   const Loader = () => {
//   return (
//     // visible && (
//       <View style={styles.absolute1}>
//         {/* <BlurView
//           style={styles.absolute}
//           blurType="light"
//           blurAmount={2}
//           reducedTransparencyFallbackColor="white"
//         > */}
//           <View style={styles.loaderContainer}>
//             <ActivityIndicator size="large" color="skyblue" />
//             <Text style={styles.loadingText}>Loading...</Text>
//           </View>
//         {/* </BlurView> */}
//       </View>
//     // )
//   );
// };
// export default Loader;

// const styles = StyleSheet.create({
//   absolute: {
//     height: '100%',
//     width: '100%',
//   },
//   absolute1: {
//     flex: 1,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//     zIndex: 10,
//   },
//   loaderContainer: {
//     alignItems: 'center', // Center content horizontally
//     justifyContent: 'center', // Center content vertically
//     flex: 1,
//   },
//   loadingText: {
//     marginTop: 10, // Add some spacing between the ActivityIndicator and the text
//   },
// });
import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Loader = () => {
  const screenWidth = Dimensions.get("window").width;
  const r = 15; 
  const c = Math.round(r / Math.SQRT2); 
  const l = Math.ceil((3 * Math.PI + 4) * r); 
  const d = Math.floor(Math.PI * r); 
  const dashOffset = useRef(new Animated.Value(l)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(dashOffset, {
        toValue: 0,
        duration: 2000, 
        useNativeDriver: true,
      })
    ).start();
  }, [dashOffset]);

  const dPath = `M${c},${-c} A${r},${r} 0 1 1 ${c},${c} L${-c},${-c} A${r},${r} 0 1 0 ${-c},${c} z`;

  return (
    <View style={styles.container}>
      <Svg
        width={screenWidth * 0.5}
        height={screenWidth * 0.25}
        viewBox={`${-screenWidth * 0.25} ${-screenWidth * 0.125} ${screenWidth * 0.5} ${screenWidth * 0.25}`}
      >
        <Path
          d={dPath}
          fill="none"
          stroke="#009FDF"
          opacity={1}
          strokeLinecap="round"
          strokeWidth="2%"
        />
        <AnimatedPath
          d={dPath}
          fill="none"
          stroke="#FFDE4D" 
          strokeLinecap="round"
          strokeWidth="2%"
          strokeDasharray={`${d} ${l - d}`}
          strokeDashoffset={dashOffset}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
     position: 'absolute', 
    top: 0,
    left: 0,
    right: 0, 
    bottom: 0,
    zIndex:3,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000040",
  },
});
export default Loader;