import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
//import MyTab from "../bottumtab";
import Home from "../../screens/main/Home";
import CostumDrawer from "../../compoents/CostumDrawer";
import BottomTab from "../BottumTab";
const Drawer=createDrawerNavigator()
const MyDrawer=()=>{
    return(
    <Drawer.Navigator drawerContent={pros=><CostumDrawer {...pros}/>} initialRouteName="Home" screenOptions={{headerShown:false}}>
        <Drawer.Screen name='home' component={BottomTab}/>
        <Drawer.Screen name='raju' component={Home}/>
    </Drawer.Navigator>
    )
}
export default MyDrawer
