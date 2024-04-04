import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
 

WebBrowser.maybeCompleteAuthSession();


export default function LoginScreen() {
 
    useWarmUpBrowser();
 
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
   
    const onPress = React.useCallback(async () => {
      try {
        const { createdSessionId, signIn, signUp, setActive } =
          await startOAuthFlow();
   
        if (createdSessionId) {
          setActive({ session: createdSessionId });
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
    }, []);  

  return (
    <View style={{justifyContent: 'center', padding:12}}>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop:96}}>
        <Image 
          source={require('../../components/database/images/assets/logohelmet1.png')}
          style={{ height: 350, width: 250 }}
        />
      </View>
      <View style={{ padding: 30, marginTop: 40, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Helmet Nepal</Text>
        <Text style={{ fontSize: 18, color: '#6B7280', marginTop: 6 }}>Lets Continue Shopping by login you account</Text>
        <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#3B82F6', borderRadius: 30, padding: 12, marginTop: 20 }}>
          <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
