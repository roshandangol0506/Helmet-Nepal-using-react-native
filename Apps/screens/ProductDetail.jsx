import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Share, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';

export default function ProductDetail({navigation, route}){

    const {params}=useRoute();
    const [product,setProduct]=useState([]);
    const {user}=useUser();
    const db=getFirestore(app);
    const nav=useNavigation();

    useEffect(() =>{
        params&&setProduct(params.product);
        shareButton();
    },[params,navigation])

    const shareButton=()=>{
        navigation.setOptions({
            headerRight: () => (
                    <Ionicons name="share-social-sharp" size={24} onPress={()=>shareProduct()} color="white" style={{marginRight:15}}/>
            ),
          });
    }

    const shareProduct=()=>{
        const content={
            message:product?.title+"\n"+product?.desc,
        }
        Share.share(content).then(resp=>{
            console.log(resp);
        },(error)=>{
            console.log(error);
        });
    }

    const sendEmailMessage=()=>{
        const subject='Regarding '+product.title;
        const body="Hi "+product.userName+"\n"+"I am interested in this product";
        Linking.openURL('mailto:'+product.userEmail+"?subject="+subject+"&body="+body);
    }

    const deleteUserPost=()=>{
        Alert.alert("Do you want to Delete?","Are you sure you want to delete the Product?",[
            {text:'Yes',
            onPress:()=>deleteFromFirestore()},
            {text:'No',
            onPress:()=>console.log('Cancel Pressed'),
            style: 'cancel',
        },

        ])
    }

    const deleteFromFirestore=async()=>{
        const q=query(collection(db,'UserPost'),where('title','==',product.title))
        const snapshot=await getDocs(q);
        snapshot.forEach(doc=>{
            deleteDoc(doc.ref).then(resp=>{
                console.log("Deleted the Porduct");
                nav.goBack();
            });
        })
    }

    const addToCart = () => {
    navigation.navigate('My Cart', { productTitle: product.title });
    ToastAndroid.show('Post added in your cart', ToastAndroid.SHORT);
}

  return (
    <ScrollView className="bg-white">
        <Image source={{uri:product.image}} className="h-[320px] w-full"/>
        <View className="p-3 mb-6">
            <Text className="text-[24px] font-bold">{product?.title}</Text>
            <View className="items-baseline">
            <Text className="rounded-full p-1 mt-2 px-2 text--blue-500 bg-blue-200">{product?.category}</Text>
            </View>
            <Text className="text-[20px] mt-3 font-bold">Description</Text>
            <Text className="text-[17px] text-gray-500">{product?.desc}</Text>
        </View>
        <View className="p-3 flex flex-row items-center gap-3 bg-blue-100 border-gray-400">
            <Image source={{uri:product.userImage}} className="w-12 h-12 rounded-full"/>
            <View className="">
                <Text className="font-bold text-[18px]">{product.userName}</Text>
                <Text className="text-gray-500">{product.userEmail}</Text>
            </View>
        </View>
        <View className="flex-row justify-between">
        <View className="p-3 mb-6">
            <Text className="text-[20px] mt-3 font-bold">Phone Number</Text>
            <Text className="text-[17px] text-gray-500">{product?.phoneno}</Text>
        </View>
        <View className="p-3 mb-6">
            <Text className="text-[20px] mt-3 font-bold">Address</Text>
            <Text className="text-[17px] text-gray-500">{product?.address}</Text>
        </View>
        </View>
        {user?.primaryEmailAddress.emailAddress==product.userEmail?
        <TouchableOpacity 
        onPress={()=>deleteUserPost()}
        className="z-40 bg-red-500 rounded-full p-4 m-2">
            <Text className="text-center text-white">Delete Product</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity 
        onPress={()=>sendEmailMessage()}
        className="z-40 bg-blue-500 rounded-full p-4 m-2">
            <Text className="text-center text-white">Send Message</Text>
        </TouchableOpacity>
        }
        <TouchableOpacity
                onPress={addToCart} // Call addToCart function when Add to Cart button is pressed
                className="z-40 bg-blue-500 rounded-full p-4 m-2">
                <Text className="text-center text-white">Add to Cart</Text>
            </TouchableOpacity>
    </ScrollView>
  )
}
