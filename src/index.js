import {View, LogBox, SafeAreaView, StatusBar,BottomTabBar} from 'react-native';
import React from 'react';
import MyStack from './navigation';
import { useSelector } from 'react-redux';
import Loader from './compoents/Loader';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
const App = () => {
  const isLoading = useSelector((state) => state.data?.isLoading);


   return (
    <View style={{flex: 1, backgroundColor: '#FFDE4D'}}>
      <StatusBar backgroundColor={'#FFDE4D'} />
      <SafeAreaView style={{flex: 1, backgroundColor:'#FFDE4D'}}>
          <MyStack/>
         {isLoading?<Loader/> :null }
      </SafeAreaView>
    </View>
  );
};
export default App;
// import { View, LogBox, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
// import React, { useState, useEffect } from 'react'; // Import useState and useEffect
// import MyStack from './src/navigation';
// import { Provider } from 'react-redux';
// import store from './src/redux/store';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); // Ignore all log notifications
// const App = () => {
//   const [isLoading, setIsLoading] = useState(true); // Add isLoading state
//   useEffect(() => {
//     // Simulate loading process (replace with your actual loading logic)
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 3000); // Simulating a 3-second loading time
//   }, []); // Empty dependency array to run the effect only once
//   return (
//     <View style={{ flex: 1, backgroundColor: '#e6f0f2' }}>
//       <Provider store={store}>
//         <StatusBar backgroundColor={'#e6f0f2'} />
//         <SafeAreaView style={{ flex: 1, backgroundColor: '#e6f0f2' }}>
//           {isLoading ? (
//             <ActivityIndicator style={{ flex: 1 }} size="large" color="#0000ff" />
//           ) : (
//             <MyStack />
//           )}
//         </SafeAreaView>
//       </Provider>
//     </View>
//   );
// };
// export default App;

