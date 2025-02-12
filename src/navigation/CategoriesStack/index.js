import React from 'react';
import Categories from '../../screens/main/Categories';
import Subcategory from '../../screens/main/Categories/subcategory';
// import Subcategory2 from '../../screens/main/Categories/subcategory2';
import { createStackNavigator } from '@react-navigation/stack';
import Details from '../../screens/main/Details';
import ProductList from '../../screens/main/ProductList';
// import Categories1 from '../screens/main/Categories/index1';
import Categories1 from '../../screens/main/Categories/index1';
 import subcategory1 from '../../screens/main/Categories/subcategory1';
import Subcategory2 from '../../screens/main/Categories/subcategory2';
const Stack = createStackNavigator();

export default function CategoriesStack() {
  return (
    <Stack.Navigator
    initialRouteName="Categoriesname" 
          screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Categoriesname" component={Categories} />
      <Stack.Screen name="Subcategory" component={Subcategory} />
      <Stack.Screen name="Subcategory2" component={Subcategory2} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="Categories1" component={Categories1} />
 <Stack.Screen name="Subcategory1" component={subcategory1} />
    </Stack.Navigator>
  );
}
