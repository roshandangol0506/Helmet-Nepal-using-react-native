import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import LatestItemList from '../Componenets/HomeScreen/LatestItemList';
import { app } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const SearchScreen = () => {
    const route = useRoute();
    const searchValue = route.params?.searchValue || '';

    const { user } = useUser();
    const db = getFirestore(app);
    const [productList, setProductList] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        user && getUserPost();
    }, [user, searchValue]);

    const getUserPost = async () => {
        try {
            const q = query(collection(db, 'UserPost'), where('tags', 'array-contains-any', searchValue.split(',')));
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
            <Text className="ml-5 mt-2 font-blod italic text-lg text-blue-600">Showing Result of "{searchValue}"</Text>
            <View>
                <LatestItemList latestItemList={productList} />
            </View>
        </View>
    )
}

export default SearchScreen
