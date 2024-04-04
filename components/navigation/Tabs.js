import {StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import MyCart from '../screens/MyCart';
import LoginScreen from '../screens/LoginScreen';
import Search from './Search';
import Post from './Post';


const Tab = createBottomTabNavigator();

const CustomTabBarButton =({children, onPress})=>(
    <TouchableOpacity onPress={onPress} style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#00AC76',
            ...styles.shadow
        }}>
            {children}
        </View>
    </TouchableOpacity>
)

const Tabs = () => {
  return (

      <Tab.Navigator initialRouteName='Home'
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: true,
        tabBarStyle: {
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-around',
            flex: 1,
            bottom: 25,
            left: 20,
            right: 20,
            height: 70,
            elevation: 0,
            backgroundColor: 'white',
            borderRadius: 15,
            borderWidth: 0.2,
            ...styles.shadow
        }
        }}>
      {/*<KeyboardAvoidingView
      behavior="padding" // Use 'padding' behavior for Android
      style={styles.container}
    keyboardVerticalOffset={Platform.OS === 'android' ? -150 : 0}>*/}
        <Tab.Screen name="Home" component={Home} options={{
            tabBarIcon: ({focused})=>(
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 1,
                }}>
                    <Image source={require('../database/images/assets/home.png')} resizeMode='contain' style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? '#00AC76' : '#748c94',
                    }}/>
                </View>
            )}}/>
        <Tab.Screen name="Favourite" component={Search} options={{
            tabBarIcon: ({focused})=>(
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 1,
                }}>
                    <Image source={require('../database/images/assets/heart1.png')} resizeMode='contain' style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? '#00AC76' : '#748c94',
                    }}/>
                </View>
            )}}/>
        <Tab.Screen name="Post" component={Post} options={{
            tabBarIcon: ({focused})=>(
                    <Image source={require('../database/images/assets/plus.png')} resizeMode='contain' style={{
                        width: 30,
                        height: 30,
                        tintColor: '#fff',
                    }}/>
            ),
            tabBarButton: (props)=>(
                <CustomTabBarButton {...props}/>
            )}}/>
        <Tab.Screen name="MyCart" component={MyCart} options={{
            tabBarIcon: ({focused})=>(
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 1,
                }}>
                    <Image source={require('../database/images/assets/cart.png')} resizeMode='contain' style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? '#00AC76' : '#748c94',
                    }}/>
                </View>
            )}}/>
        <Tab.Screen name="LoginScreen" component={LoginScreen} options={{
            tabBarIcon: ({focused})=>(
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 1,
                }}>
                    <Image source={require('../database/images/assets/login.png')} resizeMode='contain' style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? '#00AC76' : '#748c94',
                    }}/>
                </View>
            )}}/>
      </Tab.Navigator>

  )
}

export default Tabs

const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowOpacity: 0.8,
        shadowRadius: 3.5,
        elevation: 8,
    }
});