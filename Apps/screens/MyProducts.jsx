import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import LatestItemList from '../Componenets/HomeScreen/LatestItemList';
import { app } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function MyProducts(){

    const {user}=useUser();
    const db=getFirestore(app)
    const [productList,setProductList]=useState([]);
    const navigation=useNavigation();

    useEffect(()=>{
        user&&getUserPost();
    },[user])

    useEffect(()=>{
      navigation.addListener('focus',(e)=>{
        getUserPost();
      })
    },[navigation])

    const getUserPost = async () => {
    try {
        const q = query(collection(db, 'UserPost'), where('userEmail', '==', user?.primaryEmailAddress.emailAddress));
        const snapshot = await getDocs(q);
        const products = [];
        snapshot.forEach(doc => {
            products.push(doc.data());
        });
        setProductList(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

  return (
    <View>
      <LatestItemList latestItemList={productList}
      />
    </View>
  )
}

