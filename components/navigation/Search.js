import { View, Text, StatusBar, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOURS, Items } from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const MyCart = ({navigation}) => {

  const [product, setProduct] = useState();
  const [total, setTotal] = useState(null);
  const [products, setProducts] = useState([]);
  const [accessory, setAccessory] = useState([]);
  const [value, setValue]=useState(0);


  useEffect(() =>{
    const unsubscribe = navigation.addListener('focus', () =>{
      getDataFromDB()
    });
    const unsubscribe1 = navigation.addListener('focus', () =>{
      getallDataFromDB()
    });
    return unsubscribe, unsubscribe1;
  }, [navigation]);


  //get data from local DB by ID
  const getDataFromDB = async () => {
      let items = await AsyncStorage.getItem('favourateItems');
      items=JSON.parse(items);
      let productData=[];
      if (items){
        Items.forEach(data=>{
          if(items.includes(data.id)){
            productData.push(data)
            return
          }
        })
        setProduct(productData)
        getTotal(productData);
      }
      else{
        setProduct(false);
        getTotal(false);
      }      
  }



  const getallDataFromDB = () => {
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



  const getTotal = (productData) => {
    let total=0;
    for (let index=0; index<productData.length; index++){
      let productPrice = productData[index].productPrice;
      total=total+productPrice;
    }
    setTotal(total);
  };

  //remove items
  const removeItemFromCart = async id => {
    let itemArray = await AsyncStorage.getItem('favourateItems');
    itemArray=JSON.parse(itemArray);
    if (itemArray){
      let array=itemArray;
      for (let index=0; index<array.length; index++){
        if(array[index]==id){
          array.splice(index, 1);
        }
        await AsyncStorage.setItem('favourateItems',JSON.stringify(array));
        getDataFromDB();
    }
  }
  }

  const ProductCard=({data})=>{
    return(
      <TouchableOpacity  onPress={()=>navigation.navigate("ProductInfo", {productID: data.id})} style={{
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


  const renderProducts = (data,index)=>{
    return (
      <TouchableOpacity key={data.key} onPress={()=> navigation.navigate('ProductInfo', {productID: data.id})} style={{
        width: '100%',
        height: 100,
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <View style={{
          width: '30%',
          height: 100,
          padding: 14,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLOURS.backgroundLight,
          borderRadius: 10,
          marginRight: 22,
        }}>
          <Image source={data.productImage} style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}/>
        </View>
        <View style={{
          flex: 1,
          height: '100%',
          justifyContent: 'space-around',
        }}>
          <View key={index}>
            <Text style={{
              fontSize: 14,
              maxWidth: '100%',
              color: COLOURS.black,
              fontWeight: '600',
              letterSpacing: 1,
            }}>
              {data.productName}
            </Text>
            <View style={{
              marginTop: 4,
              flexDirection: 'row',
              alignItems: 'center',
              opacity: 0.6,
            }}>
              <Text style={{
                fontSize: 14,
                color: COLOURS.black,
                fontWeight: '400',
                maxWidth: '85%',
                marginRight: 4,
              }}>
                &#8377; {data.productPrice}.00
              </Text>
              <Text >
                (~&#8377;
                {data.productPrice+ data.productPrice/20})
              </Text>
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-between',
          }}>

          
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View style={{
              borderRadius: 100,
              marginRight: 20,
              padding: 4,
              borderWidth: 1,
              borderColor: COLOURS.backgroundMedium,
              opacity: 0.5,
            }}>
              <MaterialCommunityIcons name="minus" style={{
                fontSize: 16,
                color:COLOURS.backgroundDark,
              }}/>
            </View>
            <Text>1</Text>
            <View style={{
              borderRadius: 100,
              marginLeft: 20,
              padding: 4,
              borderWidth: 1,
              borderColor: COLOURS.backgroundMedium,
              opacity: 0.5,
            }}>
              <MaterialCommunityIcons name="plus" style={{
                fontSize: 16,
                color:COLOURS.backgroundDark,
              }}/>
            </View>
          </View>
          <TouchableOpacity onPress={()=> removeItemFromCart(data.id)}> 
            <MaterialCommunityIcons name="delete-outline" style={{
            fontSize: 16,
            color: COLOURS.backgroundDark,
            backgroundColor: COLOURS.backgroundLight,
            padding: 8,
            borderRadius: 100,
          }}/></TouchableOpacity>
        </View>
        </View>
      </TouchableOpacity>
    )
  }


  return (
    <View style={{
      width: '100%',
      height: '100%',
      paddingBottom: 64,
      backgroundColor: COLOURS.white,
      position: 'relative',
    }}>
      <ScrollView>
        <View style={{
          width: '100%',
          flexDirection: 'row',
          paddingTop: 16,
          paddingHorizontal: 16,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <TouchableOpacity onPress={()=> navigation.goBack()}>
            <MaterialCommunityIcons name="chevron-left" style={{
              fontSize: 18,
              color:COLOURS.backgroundDark,
              padding: 12,
              borderRadius: 12,
              backgroundColor: COLOURS.backgroundLight,
            }}/>
          </TouchableOpacity>
          <Text style={{
            fontSize: 14,
            color: COLOURS.black,
            fontWeight: '400',
          }}>Details</Text>
          <View></View>
        </View>
        <Text style={{
          fontSize: 20,
          color: COLOURS.black,
          fontWeight: '500',
          letterSpacing: 1,
          paddingTop: 20,
          paddingLeft: 16,
          marginBottom: 10,
        }}>
          My Favourites
        </Text>
        <View style={{
          paddingHorizontal: 16,
        }}>
          
          {product ? (product.map(renderProducts)) : null}
        </View>
        <View>
          <View style={{
            paddingHorizontal: 16,
            marginVertical: 36,
            borderTopWidth: 2,
          }}>
            <Text style={{
              fontSize: 36,
              color: COLOURS.black,
              fontWeight: '500',
              letterSpacing: 1,
              marginBottom: 20,

            }}>Just for You</Text>
            <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
      }}>
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content"/>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{
            padding: 16,
          }}>
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

      </ScrollView>
      
    </View>
          </View>
          </View>

      </ScrollView>


    </View>
  )
}

export default MyCart