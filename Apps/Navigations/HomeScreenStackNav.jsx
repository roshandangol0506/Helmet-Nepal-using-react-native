import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ItemList from '../screens/ItemList';
import ProductDetail from '../screens/ProductDetail';

import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

export default function HomeScreenStackNav() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
          headerShown:false,
        }}/>
        <Stack.Screen name="Item List" component={ItemList} options={
          ({route})=>({title: route.params.category, headerStyle:{
            backgroundColor: '#3b82f6',
          },
            headerTintColor:'#fff'})}/>
        <Stack.Screen name="Product Details" component={ProductDetail} options={{
           headerStyle:{
            backgroundColor: '#3b82f6',
          },
            headerTintColor:'#fff',
            headerTitle:'Detail'}}/>
        <Stack.Screen name="Search" component={SearchScreen} options={{
           headerStyle:{
            backgroundColor: '#3b82f6',
          },
            headerTintColor:'#fff',
            headerTitle:'Search'}}/>

    </Stack.Navigator>
  )
}


