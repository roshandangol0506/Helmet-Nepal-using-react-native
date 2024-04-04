import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../screens/ExploreScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetail from '../screens/ProductDetail';

const Stack=createStackNavigator();
export default function ExploreScreenStackNav(){
  return (
    <Stack.Navigator>
        <Stack.Screen name="Explore-tab" component={ExploreScreen} options={{
            headerShown:false,
        }}/>
        <Stack.Screen name="Product Details" component={ProductDetail} options={{
           headerStyle:{
            backgroundColor: '#3b82f6',
          },
            headerTintColor:'#fff',
            headerTitle:'Detail'}}/>
    </Stack.Navigator>
  )
}

