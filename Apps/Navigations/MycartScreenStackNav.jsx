import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MyCarts from '../screens/MyCarts';
import ProductDetail from '../screens/ProductDetail';


const Stack=createStackNavigator();
export default function MycartScreenStackNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="My Cart" component={MyCarts} options={{
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

