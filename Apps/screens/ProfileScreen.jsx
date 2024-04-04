import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo';
import background from '../../components/database/images/assets/addedproduct.png'
import search from '../../components/database/images/assets/search.png'
import cart from '../../components/database/images/assets/cart.png'
import login from '../../components/database/images/assets/login.png'
import { useNavigation } from '@react-navigation/native';



export default function ProfileScreen() {

  const {user}=useUser();
  const navigation =useNavigation()
  const {isLoaded,signOut}=useAuth()
  const menuList=[
    {
      id:1,
      name:'My Products',
      icon: background,
      path:'MyProduct',
    },
    {
      id:2,
      name:'Expolre',
      icon: search,
      path: 'Explore',
    },
    {
      id:3,
      name:'My Cart',
      icon: cart,
      path: 'My Cart',
    },
    {
      id:4,
      name:'Logout',
      icon: login

    },
  ]

  const onMenuPress=(item)=>{
    if(item.name === 'Logout'){
      signOut();
      return;
    }
    item?.path?navigation.navigate(item.path):null;
  }
  return (
    <View className="p-5 bg-white flex-1">
      <View className="items-center mt-14">
        <Image source={{uri:user?.imageUrl}} className="w-[100px] h-[100px] rounded-full"/>
        <Text className="font-bold text-[25px] mt-2">{user?.fullName}</Text>
        <Text className="text-[28px] mt-2 text-gray-500">{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>
      <FlatList
      data={menuList}
      numColumns={3}
      style={{marginTop:20}}
      renderItem={({item,index})=>(
        <TouchableOpacity 
        onPress={()=>onMenuPress(item)}
        className="flex-1 p-3 border-[1px] items-center mx-4 mt-4 rounded-lg border-blue-400 bg-blue-50">
          <Image source={item?.icon} className="w-[50px] h-[50px]"/>
          <Text className="text-[15px] mt-2 text-blue-700">{item.name}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}

