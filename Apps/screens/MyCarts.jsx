
import { useRoute } from '@react-navigation/native';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import LatestItemList from '../Componenets/HomeScreen/LatestItemList';
import { app } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function MyCart() {
    const { params } = useRoute();
    const productTitle = params?.productTitle || 'No Product Selected'; 

    const [dataArray, setDataArray] = useState([]);

    
    const appendToArray = (value) => {
        setDataArray(prevArray => [...prevArray, value]);
    };

    
    const clearArray = () => {
        setDataArray([]);
    };

    
    useEffect(() => {
        
        if (productTitle !== 'No Product Selected') {
            appendToArray(productTitle);
        }
    }, [productTitle]); 

    
    useEffect(() => {
        console.log("dataArray:", dataArray);
    }, [dataArray]); 

    const { user } = useUser();
    const db = getFirestore(app);
    const [productList, setProductList] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        user && getUserPost();
    }, [user, dataArray]); 

    useEffect(() => {
        navigation.addListener('focus', () => {
            getUserPost();
        });
    }, [navigation, dataArray]); 

    const getUserPost = async () => {
        try {
            if (dataArray.length === 0) {
            setProductList([]);
            } else{
            setProductList([]);
            const q = query(collection(db, 'UserPost'), where('title', 'in', dataArray));
            const snapshot = await getDocs(q);
            const products = [];
            snapshot.forEach(doc => {
                products.push(doc.data());
            });
            setProductList(products);
        }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <View className="p-5 py-8">
            <Text className="text-[30px] font-bold">My Cart</Text>
            <Text style={{ fontSize: 18, marginTop: 20 }}>Selected Product: {dataArray}</Text>
            <View>
                <LatestItemList latestItemList={productList} />
            </View>
            <TouchableOpacity onPress={clearArray} className="z-40 bg-blue-500 rounded-full p-4 m-2">
                <Text className="text-center text-white">Clear Cart</Text>
            </TouchableOpacity>
        </View>
    );
}
