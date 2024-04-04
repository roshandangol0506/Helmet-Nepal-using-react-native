import { View, Text, StatusBar, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOURS, Items } from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'


const Home = ({navigation}) => {

  const [products, setProducts] = useState([]);
  const [accessory, setAccessory] = useState([]);
  const animation= useSharedValue(0);
  const [value, setValue]=useState(0);
  const animatedStyle= useAnimatedStyle(()=>{
    return{
      width: animation.value==1 ? withTiming(300, {duration: 500}) : withTiming(0, {duration: 500}),
    };
  })

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () =>{
      getDataFromDB()
    });
    return unsubscribe;
  }, [navigation])

//get data from database
  const getDataFromDB = () => {
    let productList =[]
    let accessoryList =[]
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category == "product"){
        productList.push(Items[index]);
      }else if (Items[index].category == "accessory"){
        accessoryList.push(Items[index]);
      }
      
    }
    
    setProducts(productList);
    setAccessory(accessoryList);
  };

//create an product reusable card
  const ProductCard=({data})=>{
    return(
      <TouchableOpacity onPress={()=>navigation.navigate("ProductInfo", {productID: data.id})} style={{
        width: '48%',
        marginVertical: 14,
      }}>
        <View style={{
          width: '100%',
          height: 100,
          backgroundColor: COLOURS.backgroundLight,
          borderRadius: 10,
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {data.isOff ? (
              <View style={{
                position: 'absolute',
                width: '20%',
                height: '24%',
                backgroundColor: COLOURS.green,
                top: 0,
                left: 0,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{
                  fontSize: 12,
                  color: COLOURS.white,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}>{data.offPercentage}%</Text>
              </View>
            ) : null} 
          <Image source={data.productImage}
          style={{
            width: '80%',
            height: '80%',
            resizeMode: 'contain',
          }}
          />
        </View>
        <Text style={{
          fontSize: 12,
          color: COLOURS.black,
          fontWeight: '600',
          marginBottom: 2,
        }}>
          {data.productName}
        </Text>
        {data.category == 'accessory' ? data.isAvailable ? (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <FontAwesome name="circle" style={{
              fontSize: 12,
              color: COLOURS.green,
              marginRight: 6,
            }}/>
            <Text style={{
              fontSize: 12,
              color: COLOURS.green,
            }}>
              Available
            </Text>
          </View>
        ) : (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <FontAwesome name="circle" style={{
              fontSize: 12,
              color: COLOURS.red,
              marginRight: 6,
            }}/>
            <Text style={{
              fontSize: 12,
              color: COLOURS.red,
            }}>
              Unvailable
            </Text>
          </View>
        ) : null}
        <Text>&#8377; {data.productPrice}</Text>
      </TouchableOpacity>
      
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        marginBottom: 52,
        backgroundColor: COLOURS.white,
      }}>
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content"/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
      }}>
      <View style={{
      position: 'fixed',
    }}>
      <Animated.View style={[
        {
          width: 300,
          height: 40,
          backgroundColor: '#E7E7E7',
          borderRadius: 10,
          flexDirection: 'row',
        },
        animatedStyle,
      ]}>
          <TextInput style={{width: '85%', paddingLeft:10}} placeholder={'Search here....'}/>
          <TouchableOpacity onPress={()=>{
            if (animation.value==1){
              animation.value=0;
              setValue(0);
            } else{
              animation.value=1;
              setValue(1);
            }
          }}>
          <Image source={value==1 ? require('../database/images/assets/close.png') : require('../database/images/assets/search.png')} style={{width: 30, 
          height: 30, 
          padding: 12, 
          left: value==1? 20:0,
          marginTop: 5,}}/>

          </TouchableOpacity>
      </Animated.View>
    </View>
        <TouchableOpacity onPress={()=> navigation.navigate('MyCart')}>
          <MaterialCommunityIcons name="cart" style={{
            fontSize: 18,
            color:COLOURS.backgroundMedium,
            padding: 12,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: COLOURS.backgroundLight,
          }}/>
        </TouchableOpacity>
      </View>
      <View style={{
        marginBottom: 10,
        padding: 16,
      }}>
        <Text style={{
          fontSize: 26,
          fontWeight: '500',
          color: COLOURS.black,
          letterSpacing: 1,
          marginBottom: 10,
        }}>Hi-Fi Shop &amp; Service</Text>
        <Text style={{
          fontSize: 14,
          fontWeight: '400',
          color: COLOURS.black,
          letterSpacing: 1,
          lineHeight: 24,
        }}>Audio shop on Rustaveli Ave 57.
           {'\n'}This shop offers both products and services</Text>
      </View>
      <View style={{
            padding: 16,
          }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-between',
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '500',
                color: COLOURS.black,
                letterSpacing: 1,
              }}>Products</Text>
              <Text style={{
                fontSize: 14,
                fontWeight: '500',
                color: COLOURS.black,
                letterSpacing: 1,
                opacity: 0.5,
              }}>41</Text>
            </View>
            <Text style={{
              fontSize: 14,
              fontWeight: '400',
              color: COLOURS.blue,
            }}>
              SeeAll
            </Text>
        </View>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent:'space-around',
        }}>
          {
            products.map((data)=>{
              return <ProductCard data={data} key={data.id}/>
            })
          }
        </View>
      </View>
      <View style={{
            padding: 16,
          }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-between',
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '500',
                color: COLOURS.black,
                letterSpacing: 1,
              }}>Accessories</Text>
              <Text style={{
                fontSize: 14,
                fontWeight: '500',
                color: COLOURS.black,
                letterSpacing: 1,
                opacity: 0.5,
              }}>78</Text>
            </View>
            <Text style={{
              fontSize: 14,
              fontWeight: '400',
              color: COLOURS.blue,
            }}>
              SeeAll
            </Text>
        </View>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent:'space-around',
        }}>
          {
            accessory.map((data)=>{
              return <ProductCard data={data} key={data.id}/>
            })
          }
        </View>
      </View>    

      </ScrollView>
      
    </View>
    
  )
}

export default Home