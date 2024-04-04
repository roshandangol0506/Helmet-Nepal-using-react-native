import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Image, ToastAndroid, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import { app } from '../../firebaseConfig';
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo';


export default function AddPostScreen() {

  const storage = getStorage();
  const [loading,setLoading]=useState(false);
  const {user}=useUser();
  const [image, setImage] = useState(null);
  const db = getFirestore(app);
  const [categoryList,setCategoryList]=useState([]);

  useEffect(()=>{
    getCategoryList();
  },[])

  const getCategoryList=async() =>{
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, 'Category'));
    querySnapshot.forEach((doc)=>{
      console.log("Docs",doc.data());
      setCategoryList(categoryList=>[...categoryList,doc.data()])
    })
  }


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod = async (value) => {
    setLoading(true); // Set loading to true when the submission starts
  
    try {
      // Upload the image to storage
      const resp = await fetch(image);
      const blob = await resp.blob();
      const storageRef = ref(storage, "communityPost/" + Date.now() + "jpg");
      await uploadBytes(storageRef, blob);
  
      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);
  
      // Update the value with additional data
      value.image = downloadURL;
      value.userName = user.fullName;
      value.userEmail = user.primaryEmailAddress.emailAddress;
      value.userImage = user.imageUrl;
  
      // Add the document to Firestore
      const docRef = await addDoc(collection(db, "UserPost"), value);
  
      // Show success message
      Alert.alert("Success", "Post Added Successfully");
  
      setLoading(false); // Set loading to false when the submission completes
    } catch (error) {
      console.error("Error adding post:", error);
      Alert.alert("Error", "Failed to add post");
  
      setLoading(false); // Set loading to false if an error occurs
    }
  };
  

  return (
    <KeyboardAvoidingView>
    <ScrollView className="p-10 bg-white">
      <Text className="text-[27px] font-bold">Add New Post</Text>
      <Text className="text-[18px] text-gray-500 mb-7">Create new post and start sellecting</Text>
      <Formik initialValues={{title:'',desc:'',category:'',address:'',phoneno:'',price:'',image:'',tags:'',userName:'',userEmail:'',userImage:'',createdAt:Date.now()}} onSubmit={value=>onSubmitMethod(value)} validate={(values)=>{
        const errors={}
        if(!values.title){
          ToastAndroid.show('Title must be there', ToastAndroid.SHORT)
          errors.name="Title is required"
        }
        return errors
      }}>
        {({handleChange,handleBlur,handleSubmit,values,setFieldValue,errors})=>(
          <View>
            <TouchableOpacity onPress={pickImage}>
              {image? 
              <Image source={{uri:image}} style={{width:100,height:100,borderRadius:15}}/>
              : 
              <Image className="h-[400px] w-full object-cover" source={require('../../components/database/images/assets/addimage.png')} style={{width:100,height:100,borderRadius:15}}/>}
            </TouchableOpacity>
            <TextInput style={styles.input} placeholder='Title' value={values?.title} onChangeText={handleChange('title')}/>
            <TextInput style={styles.input} placeholder='Description' value={values?.desc} numberOfLines={5} onChangeText={handleChange('desc')}/>
            <TextInput style={styles.input} placeholder='Price' value={values?.price} keyboardType='number-pad' onChangeText={handleChange('price')}/>
            <TextInput style={styles.input} placeholder='Address' value={values?.address} onChangeText={handleChange('address')}/>
            <TextInput style={styles.input} placeholder='Phone Number' value={values?.phoneno} onChangeText={handleChange('phoneno')}/>
            <TextInput 
  style={styles.input} 
  placeholder='Add Related tags seperate it by commas' 
  value={values?.tags} 
  onChangeText={(text) => {
    // Split the input string by commas and trim whitespace from each tag
    const tagsArray = text.split(',').map(tag => tag.trim());
    // Set the tags array to formik values
    setFieldValue('tags', tagsArray);
  }}
/>

            <View style={{borderWidth:1,borderRadius:10,marginTop:15}}>
            <Picker selectedValue={values?.category} className="border-2" onValueChange={itemValue=>setFieldValue('category',itemValue)}>
              {categoryList.length>0&&categoryList?.map((item,index)=>(
                <Picker.Item key={index} label={item?.name} value={item?.name}/>
              ))}
              </Picker>
              </View>
              <TouchableOpacity onPress={handleSubmit} 
              style={{
                backgroundColor:loading?'#ccc':'#007BFF'
              }}
              disabled={loading}
              className="p-4 bg-blue-500 rounded-full mt-10">
                {loading?
                <ActivityIndicator color='#fff'/>
                :
                <Text className="text-white text-center text-[16px]">Submit</Text>
              }
                
              </TouchableOpacity>
          </View>
        )}

      </Formik>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  input:{
    borderWidth:1,
    borderRadius:10,
    marginTop:15,
    marginBottom:5,
    padding:10,
    textAlignVertical:'top',
    paddingHorizontal:17,
    fontSize:17,
  }
})