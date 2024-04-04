import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function PostItem({item}) {

  const navigation=useNavigation();

  return (
    <TouchableOpacity className="flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-200" 
    onPress={()=>navigation.push('Product Details',{product:item})}>
        <Image source={{uri:item.image}} className="w-full h-[160px]"/>
        <View>
            <Text className="text-[15px] font-bold mt-2">{item.title}</Text>
            <Text className="text-[20px] font-bold text-blue-500">${item.price}</Text>
            <Text className="text-blue-500 bg-blue-200 mt-2 p-1 text-center rounded-full px-2 text-[12px] w-[80px]">{item.category}</Text>
        </View>
    </TouchableOpacity>
  )
}

