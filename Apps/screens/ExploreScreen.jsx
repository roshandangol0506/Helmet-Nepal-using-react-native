import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItemList from '../Componenets/HomeScreen/LatestItemList';

export default function ExploreScreen() {
  const db = getFirestore(app);
  const [productList, setproductList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'UserPost'));
      const snapshot = await getDocs(q);
      const products = [];
      snapshot.forEach((doc) => {
        products.push(doc.data());
      });
      setproductList(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="p-5 py-8">
      <Text className="text-[30px] font-bold">Explore More</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" />
      ) : (
        <LatestItemList latestItemList={productList} />
      )}
    </ScrollView>
  );
}
