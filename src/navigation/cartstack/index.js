// CartStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from '../../screens/main/Cart';
import OrderList from '../../screens/main/OrderList';
import OrderDetails from '../../screens/main/OrderDetails';

const Stack = createStackNavigator();

export default function CartStack() {
  return (
    <Stack.Navigator
      initialRouteName="Cartname"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cartname" component={Cart} />
      <Stack.Screen name="OrderList" component={OrderList} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
    </Stack.Navigator>
  );
}
