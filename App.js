import { LogBox, SafeAreaView, StatusBar, View } from 'react-native'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import firebase from '@react-native-firebase/app';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import RootApp from './src/navigation'
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

PushNotification.createChannel(
  {
    channelId: "default-channel-id",
    channelName: "My channel",
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`)
);

const App = () => {
  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'This app needs access to notifications to alert you.',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission denied');
      }
    }
  };

 

useEffect(() => {
  requestNotificationPermission();
  crashlytics().log('Analytics page just mounted');
  getCrashlyticsDetail();
  return () => {
    crashlytics().log('Analytics page just unmounted');
  };
}, []);

const getCrashlyticsDetail = async () => {
  const userStatus = await AsyncStorage.getItem('user_data');
  const userData = userStatus ? JSON.parse(userStatus) : null;
 

  try {
    crashlytics().setUserId(userData?.user_id);
    crashlytics().setAttribute('username', userData?.user_id);
  } catch (err) {
    crashlytics().recordError(err);
  }
};


PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKENNNNNNNNNNNNNNNNNNN:", token);
    AsyncStorage.setItem('fcm_token', token.token)
  },
  onNotification: function (notification) {
    PushNotification.localNotification({
      title: notification.message,
      message: notification.title,
      smallIcon: "android/app/src/main/res/drawable/ic_launcher.png", // The name of the small icon (for Android)
      largeIcon: "android/app/src/main/res/drawable/ic_launcher_foreground.png", 
    });
    console.log('this is notifi',notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);
  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

  useEffect(() => {
    if (!firebase.apps.length) {
      console.log('Firebase not initialized!');
    } else {
      console.log('Firebase connected successfully!');
    }
  }, []);
 

  return (
  
      <View style={{flex: 1, backgroundColor: '#FFDE4D'}}>
      <StatusBar backgroundColor={'#FFDE4D'} />
      <SafeAreaView style={{flex: 1, backgroundColor:'#FFDE4D'}}>
      <Provider store={store}>
        <RootApp/>
      </Provider>
      </SafeAreaView>
    </View>
  )
}

export default App


