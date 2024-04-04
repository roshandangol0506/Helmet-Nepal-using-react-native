import { View, Text, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Animated, {FadeIn, FadeInDown, FadeInUp, FadeOut} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';


const SignupScreen = () => {
  const navigation=useNavigation();
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [username, setUsername]=useState("");
  const [phoneno, setPhoneno]=useState("");
  const [seePassword, setSeePassword]=useState(true);
  const [checkValidEmail, setCheckValidEmail]=useState(false)

  const handleCheckEmail=(text) => {
    let re=/\S+@S+\.\S+/;
    let regex=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    setEmail(text)
    if (re.test(text) || regex.test(text)){
      setCheckValidEmail(false)
    } else {
      setCheckValidEmail(true)
    }

  };

  const checkPasswordValidity=value => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return 'Password must not contain WhiteSpaces.';
    } 
    const isContainUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainUppercase.test(value)) {
      return 'Password must have at least one Uppercase letter';
    } 
    const isContainLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainLowercase.test(value)) {
      return 'Password must have at least one Lowercase letter';
    }
    const isContainNumber = /^(?=.*[0-9]).*$/;
    if (!isContainNumber.test(value)) {
      return 'Password must have at least one Digit';
    }
    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return 'Password must be 8-16 Characters Long';
    }
    return null;  
  };


  const handleLogin=()=>{
    const checkPassword=checkPasswordValidity(password);
    if (!checkPassword){
      ToastAndroid.show(
        "Item added successfully to cart", ToastAndroid.SHORT,
      );
      navigation.navigate('MyCart');
    } else{
      alert(checkPassword)
    }
  }
  return (
    <View className="bg-white h-full w-full" >
      <StatusBar style="light"/>
      <Image className="h-full w-full absolute" source={require('../database/images/assets/background.png')}/>
      <View className="flex-row items-center justify-around w-full absolute">
        <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify().damping(3)} className="h-[250] w-[200] mt-10" source={require('../database/images/assets/logohelmet2.png')}/>
      </View>

      <View className="h-full w-full flex justify-around pt-48 mt-10">
        <View className="flex items-center">
          <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">
            Sign Up
          </Animated.Text>
        </View>

        <View className="flex mx-11 space-y-4">
          <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-transparent p-3 w-full h-12" style={{borderBottomColor: 'rgb(56 189 248)', borderBottomWidth: 3}}>
            <TextInput placeholder='Username (Enter your Full Name)' placeholderTextColor={'gray'} value={username} onChangeText={(text)=>setUsername(text)}/>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-transparent p-3 w-full h-12" style={{borderBottomColor: 'rgb(56 189 248)', borderBottomWidth: 3}}>
            <TextInput placeholder='Email' placeholderTextColor={'gray'} value={email} onChangeText={(text)=>handleCheckEmail(text)}/>
          </Animated.View>
          {checkValidEmail ? (<Text className="font-bold text-red-700 text-right m-0 p-0 tracking-tighter">Wrong Format email</Text>) : (<Text className="font-bold text-red-700 text-right m-0 p-0 tracking-tighter"></Text>)}
          <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="bg-white p-3 w-full h-12" style={{borderBottomColor: 'rgb(56 189 248)', borderBottomWidth: 3}}>
            <TextInput placeholder='Phone No. (+977)' placeholderTextColor={'gray'} value={phoneno} onChangeText={(text)=>setPhoneno(text)}/>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="bg-white p-3 w-full h-12" style={{borderBottomColor: 'rgb(56 189 248)', borderBottomWidth: 3}}>
            <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry={seePassword} value={password} onChangeText={(text)=>setPassword(text)}/>
            <TouchableOpacity className="absolute  ml-96" onPress={()=>setSeePassword(!seePassword)}>
            <Image source={seePassword ? require('../database/images/assets/eye.png') : require('../database/images/assets/eyeActive.png')} className="h-7 w-7 mt-2" />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className="w-full">
          {email== '' || password== '' || username=='' || phoneno=='' || checkValidEmail== true ? (<TouchableOpacity disabled className="w-full bg-sky-400 p-5 rounded-3xl mb-3 mt-10" onPress={handleLogin}>
            <Text className="text-xl font-bold text-white text-center">
              SIGN UP
            </Text>
          </TouchableOpacity>):(<TouchableOpacity className="w-full bg-sky-400 p-5 rounded-3xl mb-3 mt-10" onPress={handleLogin}>
            <Text className="text-xl font-bold text-white text-center">
              SIGN UP
            </Text>
          </TouchableOpacity>)}
          
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(1000).duration(1000).springify()} className="flex-row justify-center">
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={()=> navigation.push('LoginScreen')}>
            <Text className="text-sky-600 text-sm font-bold ml-2">Login</Text>
          </TouchableOpacity>
        </Animated.View>
        </View>
        
      </View>
    </View>
  )
  }
export default SignupScreen