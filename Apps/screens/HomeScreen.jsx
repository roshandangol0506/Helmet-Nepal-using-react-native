import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import Slider from '../Componenets/HomeScreen/Slider'
import { getFirestore, collection, getDocs, orderBy } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import Categories from '../Componenets/HomeScreen/Categories';
import LatestItemList from '../Componenets/HomeScreen/LatestItemList';
import Header from '../Componenets/HomeScreen/Header';


export default function HomeScreen() {

  const db = getFirestore(app);
  const [sliderList,setSliderList]=useState([]);
  const [categoryList,setCategoryList]=useState([]);
  const [latestItemList,setLatestItemList]=useState([]);

  useEffect(()=>{
    getSliders();
    getCategoryList();
    getLatestItemList();
  },[])

  const getSliders=async()=>{
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    setSliderList(sliderList=>[...sliderList,doc.data()])
    });
  }

  const getCategoryList=async() =>{
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, 'Category'));
    querySnapshot.forEach((doc)=>{
      setCategoryList(categoryList=>[...categoryList,doc.data()])
    })
  }

  const getLatestItemList=async()=>{
    setLatestItemList([]);
    const querySnapshot = await getDocs(collection(db,'UserPost'),orderBy('createdAt','desc'));
    querySnapshot.forEach((doc)=>{
      setLatestItemList(latestItemList=>[...latestItemList,doc.data()]);
    })
  }


  return (
    <ScrollView  className="px-6 py-8 bg-white flex-1">
      <Header/>
      <Slider sliderList={sliderList}/>
      <Categories categoryList={categoryList}/>
      <LatestItemList latestItemList={latestItemList}
      heading={'Latest Items'}/>
    </ScrollView>
  )
}

