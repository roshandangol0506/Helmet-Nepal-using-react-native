import { View, Text, StatusBar, ScrollView, TouchableOpacity, FlatList, Image, Dimensions, Animated, ToastAndroid} from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLOURS, Items } from '../database/Database';
import Entypo from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleIncrement, handleIncrementtwo, x, y} from '../navigation/Var';
import { AirbnbRating, Rating } from 'react-native-ratings';

const ProductInfo = ({route, navigation}) => {

  const {productID}= route.params;

  const [product, setProduct] = useState({});

  const width=Dimensions.get('window').width
  const [seePassword, setSeePassword]=useState(true);

  const scrollX=new Animated.Value(0);
  let position= Animated.divide(scrollX,width);
  
  useEffect(() =>{
    const unsubscribe = navigation.addListener('focus', () =>{
      getDataFromDB()
    });
    return unsubscribe;
  }, [navigation]);

  //get product data by productID
  const getDataFromDB = async () =>{
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].id == productID){
        await setProduct(Items[index]);
        return
      }
      
    }
  };

  //add to Cart
  const addToCart=async id=>{
    let itemArray= await AsyncStorage.getItem('cartItems');
    itemArray=JSON.parse(itemArray);
    handleIncrement();
    console.log(x);
    if(itemArray){
      let array= itemArray
      array.push(id);
      try{
        await AsyncStorage.setItem('cartItems',JSON.stringify(array));
        if (x==2){
          navigation.navigate('LoginScreen');
        }
        if (x>2){
          navigation.navigate('Home');
        }
         
      }catch (error){
        return error;
      }
    } else{
      let array=[];
      array.push(id);
      try{
      await AsyncStorage.setItem('cartItems',JSON.stringify(array));
      if (x==2){
        navigation.navigate('LoginScreen');
      }
      if (x>2){
        navigation.navigate('Home');
        x=3;
      } 
        
      }catch {
        return error;
      }
    }
  }
  const addToFavourite=async id=>{
    let itemArray1= await AsyncStorage.getItem('favourateItems');
    itemArray1=JSON.parse(itemArray1);
    handleIncrementtwo();
    console.log(y);
    setSeePassword(!seePassword);
    if(itemArray1){
      let array1= itemArray1
      array1.push(id);
      try{
        await AsyncStorage.setItem('favourateItems',JSON.stringify(array1));
        ToastAndroid.show('Items added to my favourate', ToastAndroid.SHORT);
      }catch (error){
        return error;
      }
    } else{
      let array1=[];
      array1.push(id);
      try{
      await AsyncStorage.setItem('favourateItems',JSON.stringify(array1));
        ToastAndroid.show('Items added to my favourate', ToastAndroid.SHORT);
      }catch {
        return error;
      }
    }
  }

  const removeToFavourite=async id=>{
    
    ToastAndroid.show('remove favourate', ToastAndroid.SHORT);
    handleIncrementtwo();
    console.log(y);
    setSeePassword(!seePassword);
    let itemArray1 = await AsyncStorage.getItem('favourateItems');
    itemArray1=JSON.parse(itemArray1);
    if (itemArray1){
      let array1=itemArray1;
      for (let index=0; index<array1.length; index++){
        if(array1[index]==id){
          array1.splice(index, 1);
        }
        await AsyncStorage.setItem('favourateItems',JSON.stringify(array1));
    }
  }
  }


  //product horizontal scroll product card
  const renderProduct= ({item, index}) =>{
    return (
      <View style={{
        width: width,
        height: 240,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Image source={item} style={{
          width: '100%',
          height: '100%',
          resizeMode: 'contain',
        }}/>
      </View>
    )
  };

  var rat=0;
  const rati=(rating)=>{
    rat=rating;
  }


  return (
    <View style={{
      width: '100%',
      height: '100%',
      backgroundColor: COLOURS.white,
      position: 'relative',
    }}>
    <View style={{
      marginBottom: 96,
      backgroundColor: COLOURS.white,
      
    }}>
      <StatusBar backgroundColor={COLOURS.backgroundLight} barStyle="dark-content"/>
      <ScrollView>
        <View style={{
          width: '100%',
          backgroundColor: COLOURS.backgroundLight,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          position: 'relative',
          justifyContent: 'center',
          marginBottom: 4,
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent:'space-between',
            paddingLeft: 16,
            paddingTop: 16,
            width: '100%',
          }}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <Entypo name="chevron-left" style={{
                fontSize: 18,
                color:COLOURS.backgroundDark,
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLOURS.white,
              }}/>
            </TouchableOpacity>
          </View>
          <FlatList 
          data={product.productImageList ? product.productImageList : null} 
          horizontal 
          renderItem={renderProduct}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0.8}
          snapToInterval={width}
          bounces={false}
          onScroll={Animated.event(
            [{
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            }],
            {
              useNativeDriver: false
            },
          )}/>
          <View style={{
            width: "100%",
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'center',
            marginBottom: 18,
            marginTop: 32,
          }}>
            {
               product.productImageList ? product.productImageList.map((data,index)=>{
                let opacity= position.interpolate({
                  inputRange: [index-1, index, index+1],
                  outputRange: [0.2, 1, 0.2],
                  extrapolate: 'clamp',
                })
                return(
                  <Animated.View key={index} style={{
                    width: '16%',
                    height: 2.4,
                    backgroundColor: COLOURS.black,
                    opacity,
                    marginHorizontal: 4,
                    borderRadius: 100,
                  }}>
                    
                  </Animated.View>
                )
              }) : null
            }
          </View>
        </View>
        <View style={{
          paddingHorizontal: 16,
          marginTop: 6,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 14,
          }}>
            <Entypo name="shopping-cart" style={{
              fontSize: 18,
              color:COLOURS.blue,
              marginRight: 6,
            }}/>
            <Text style={{
              fontSize: 12,
              color: COLOURS.black,

            }}>Shopping</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            marginVertical: 4,
            alignItems: 'center',
            justifyContent:'space-between',
          }}>
            <Text style={{
              fontSize: 24,
              fontWeight: '600',
              color: COLOURS.black,
              letterSpacing: 0.5,
              marginVertical: 4,
              maxWidth: "84%",
            }}>{product.productName}</Text>
            <Ionicons name="link-outline" style={{
              fontSize: 24,
              color: COLOURS.blue,
              backgroundColor: COLOURS.blue + 10,
              padding: 8,
              borderRadius: 100,
            }}/>
          </View>
          <Text style={{
            fontSize: 12,
            color: COLOURS.black,
            fontWeight: '400',
            letterSpacing: 1,
            opacity: 0.5,
            lineHeight: 20,
            maxWidth: "85%",
            maxHeight: 60,
            marginBottom: 25,
          }}>
            {product.discription}
          </Text>
          
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-between',
            paddingHorizontal: 16,
          }}>
          <View style={{
            }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '500',
              maxWidth: '85%',
              color: COLOURS.black,
              marginBottom: 4,
            }}>&#8377; {product.productPrice}.00</Text>

            <Text>
              Tax Rate 2%~&#8377;{product.productPrice/20} (&#8377;
              {product.productPrice+ product.productPrice/20})
            </Text>
            </View>
            <TouchableOpacity onPress={y ? ()=> addToFavourite(product.id): ()=> removeToFavourite(product.id)} style={{
              marginLeft: 96,
              left: 20,
        }}>
          <Image source={seePassword ? require('../database/images/assets/heart1.png') : require('../database/images/assets/redheart.png')} style={{
            width: 35,
            height: 30,
          }}/>
        </TouchableOpacity>

          </View>
          <View style={{
            marginTop: 32,
            marginBottom: 32,
            color: COLOURS.black,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '500',
              letterSpacing: 1,
              color: COLOURS.black,
              textTransform: 'uppercase',
            }}>Items Specifications</Text>
            <View style={{
              paddingHorizontal: 20,
              marginTop: 5,
            }}>
              <View style={{
              borderBottomWidth: 2,
              borderBottomColor: COLOURS.backgroundMedium,
              paddingTop: 10, 
              paddingBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent:'space-between',
              }}>
              <Text style={{
              fontSize: 16,
              fontWeight: '400',
              color: COLOURS.black,
            }}>Brand Name</Text>
            <Text style={{
              fontSize: 16,
              fontWeight: '400',
              color: COLOURS.black,
              right: 96,
            }}>{product.Brand}</Text>
              </View>
              <View style={{
              borderBottomWidth: 2,
              borderBottomColor: COLOURS.backgroundMedium, 
              paddingTop: 10, 
              paddingBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent:'space-between',
              }}>
              <Text style={{
              fontSize: 16,
              fontWeight: '400',
              color: COLOURS.black,
            }}>Graphics</Text>
            <Text style={{
              fontSize: 16,
              fontWeight: '400',
              color: COLOURS.black,
              right: 96,
            }}>{product.Graphics}</Text>
              </View>
              <View style={{
              borderBottomWidth: 2,
              borderBottomColor: COLOURS.backgroundMedium, 
              paddingTop: 10, 
              paddingBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent:'space-between',
              }}>
              <Text style={{
              fontSize: 16,
              fontWeight: '400',
              color: COLOURS.black,
            }}>Category</Text>
            <Text style={{
              fontSize: 16,
              fontWeight: '400',
              color: COLOURS.black,
              right: 96,
            }}>{product.SubCategory}</Text>
              </View>
              <View style={{
              borderBottomWidth: 2,
              borderBottomColor: COLOURS.backgroundMedium, 
              paddingTop: 10, 
              paddingBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent:'space-between',
              }}>
              <Text style={{
              fontSize: 16,
              fontWeight: '400',
              color: COLOURS.black,
            }}>Product Model</Text>
            <Text style={{
              fontSize: 16,
              fontWeight: '400',
              color: COLOURS.black,
              right: 96,
            }}>{product.ProductModel}</Text>
              </View>            
              <View style={{
              borderBottomWidth: 2,
              borderBottomColor: COLOURS.backgroundMedium, 
              paddingTop: 10, 
              paddingBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent:'space-between',
              }}>
              <Text style={{
              fontSize: 16,
              fontWeight: '400',
              color: COLOURS.black,
            }}>Manufacturer</Text>
            <Text style={{
              fontSize: 16,
              fontWeight: '400',
              color: COLOURS.black,
              right: 96,
            }}>{product.Manufacturer}</Text>
              </View>
            </View>
          </View>
          <View style={{
            marginTop: 10,
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-between',
          }}>
            <View style={{
            }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '500',
            letterSpacing: 1,
            color: COLOURS.black,
            textTransform: 'uppercase',
            textDecorationLine: 'underline',
          }}>{product.postName}</Text>
          <Text>{product.phNumber}</Text>
          </View>
          <Rating type='heart' ratingCount={5} showRating={true} fractions={1} jumpValue={0.2} ratingTextColor='black' startingValue={2.4} imageSize={30} style={{fontSize: 10}} onFinishRating={rating=>rati(rating)}/>
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-between',
            marginVertical: 14,
            borderBottomColor: COLOURS.backgroundLight,
            borderBottomWidth: 1,
            paddingBottom: 20,
          }}>
            
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: "80%",
            }}>
              <View style={{
                color: COLOURS.blue,
                backgroundColor: COLOURS.backgroundLight,
                alignItems: "center",
                justifyContent: "center",
                padding: 12,
                borderRadius: 100,
                marginRight: 10,
              }}>
                <Entypo name="location-pin" style={{
                  fontSize: 16,
                  color:COLOURS.blue,
                }}/>
              </View>
              <Text style={{

              }}>Rustaveli Ave 57,{'\n'}17-001, Batume</Text>
            </View>
            <Entypo name="chevron-right" style={{
              fontSize: 22,
              color: COLOURS.backgroundDark,
            }}/>
          </View>
        </View>
      </ScrollView>

    </View>
    <View style={{
        position: 'absolute',
        bottom: 20,
        marginBottom: 10,
        height: '8%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <TouchableOpacity onPress={()=> (product.isAvailable ? addToCart(product.id) : null)} style={{
          width: '86%',
          height: '90%',
          backgroundColor: COLOURS.blue,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: 12,
            fontWeight: '500',
            letterSpacing: 1,
            color: COLOURS.white,
            textTransform: 'uppercase',
          }}>{product.isAvailable ? 'Add to cart' : 'Not Available'}</Text>
        </TouchableOpacity>
      </View>
  </View>
  )
}

export default ProductInfo