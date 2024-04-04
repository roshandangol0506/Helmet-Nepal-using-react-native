import { View, Text, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Header() {
    const {user}=useUser();
    const navigation=useNavigation();
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = () => {
        navigation.navigate('Search', { searchValue });
    }

    return (
        <View>
            <View className="flex flex-row items-center gap-2">
                <Image source={{uri:user?.imageUrl}} className="rounded-full w-12 h-12"/>
                <View>
                    <Text className="text-[16px]">Welcome</Text>
                    <Text className="text-[20px] font-bold">{user?.fullName}</Text>
                </View>
            </View>

            <View className="p-[9px] px-5 flex flex-row items-center bg-blue-50 mt-5 rounded-full border-[2px] border-blue-300" >
                <TouchableOpacity onPress={handleSearch}>
                    <Ionicons name="search" size={24} color="gray"/>
                </TouchableOpacity>
                <TextInput  
                    placeholder='Search' 
                    onChangeText={setSearchValue} 
                    value={searchValue}
                    className="ml-3 text-[18px]"
                />
            </View>
        </View>
    )
}
