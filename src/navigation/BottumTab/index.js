
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Feather from "react-native-vector-icons/Feather";
import Home from "../../screens/main/Home";
import Favorit from "../../screens/main/Favorites";
import Cart from "../../screens/main/Cart";
import Profile from "../../screens/main/Profile";
import CategoriesStack from "../CategoriesStack";
import CartStack from "../cartstack";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
       <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: "#FFDE4D",
            height: 55, 
            justifyContent: 'space-between',
          },
          tabBarLabelStyle: {
            fontSize: 12, 
            fontFamily: "Mulish-Bold", 
            marginBottom:5 
          },
          tabBarIconStyle: {
            marginBottom: -3, 
          },
          tabBarActiveTintColor: "#000000",
          tabBarInactiveTintColor: "#7D7D7D",
          labelPosition: "beside-icon", 
          headerShown: false,
          labelPosition: "below-icon", 
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            let IconComponent = Feather;
            let iconSize = 20;
            if (route.name === "Home") {
              iconName = "home";
              IconComponent = SimpleLineIcons;
            } else if (route.name === "Categories") {
              iconName = "grid";
            } else if (route.name === "Favorite") {
              iconName = "heart";
            } else if (route.name === "Cart") {
              iconName = "shopping-bag";
            } else if (route.name === "Profile") {
              iconName = "user";
              IconComponent = SimpleLineIcons;
            }

            return <IconComponent name={iconName} size={iconSize} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Categories" component={CategoriesStack} />
        <Tab.Screen name="Favorite" component={Favorit} />
        <Tab.Screen name="Cart" component={CartStack} />
        <Tab.Screen name="Profile" component={Profile}  options={{tabBarStyle: { display: "none" }}}/>
       
      </Tab.Navigator>
    </SafeAreaView>
  );
}



