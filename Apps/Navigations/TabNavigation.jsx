import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import AddPostScreen from '../screens/AddPostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import HomeScreenStackNav from './HomeScreenStackNav';
import ExploreScreenStackNav from './ExploreScreenStackNav';
import ProfileScreenStackNav from './ProfileScreenStackNav';
import MyCarts from '../screens/MyCarts';
import MycartScreenStackNav from './MycartScreenStackNav';

const Tab = createBottomTabNavigator();
export default function TabNavigation () {
  return (
    <Tab.Navigator screenOptions={{headerShown:false, tabBarActiveTintColor:"#000"}}>
        <Tab.Screen name="HomeScreenStack" component={HomeScreenStackNav} options={{ tabBarLabel:({color})=>(
            <Text style={{color:color,fontSize:12,marginBottom:3}}>Home</Text>
        ),
        tabBarIcon:({color,size})=>(
            <Ionicons name="home" size={size} color={color}/>
        ) }}/>
    <Tab.Screen name="Explore" component={ExploreScreenStackNav} options={{ tabBarLabel:({color})=>(
            <Text style={{color:color,fontSize:12,marginBottom:3}}>Explore</Text>
        ),
        tabBarIcon:({color,size})=>(
            <Ionicons name="search" size={size} color={color}/>
        ) }}/>
    <Tab.Screen name="Add Post" component={AddPostScreen} options={{ tabBarLabel:({color})=>(
            <Text style={{color:color,fontSize:12,marginBottom:3}}>AddPost</Text>
        ),
        tabBarIcon:({color,size})=>(
            <Ionicons name="camera" size={size} color={color}/>
        ) }}/>
    <Tab.Screen name="profile" component={ProfileScreenStackNav} options={{ tabBarLabel:({color})=>(
            <Text style={{color:color,fontSize:12,marginBottom:3}}>Profile Pic</Text>
        ),
        tabBarIcon:({color,size})=>(
            <Ionicons name="person-circle" size={size} color={color}/>
        ) }}/>
    <Tab.Screen name="My Cart" component={MyCarts} options={{ tabBarLabel:({color})=>(
            <Text style={{color:color,fontSize:12,marginBottom:3}}>My Cart</Text>
        ),
        tabBarIcon:({color,size})=>(
            <Ionicons name="cart" size={size} color={color}/>
        ) }}/>
    </Tab.Navigator>
  )
}

