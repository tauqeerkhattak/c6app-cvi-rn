import * as React from 'react';
import * as RN from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screen/welcomeScreen'
import DetailScreen from '../screen/detailScreen'
import SignUpStep1Screen from '../screen/signUpStep1Screen'
import SignUpStep2Screen from '../screen/signUpStep2Screen'
import SignUpStep3Screen from '../screen/signUpStep3Screen'
import LoginScreen from '../screen/loginScreen'

const WelcomeStack = createNativeStackNavigator();

function WelcomeStackScreen({ navigation, route }) {
  const _handleOpenURL = link => {
    console.log(link)
    // Handle dynamic link inside your own application
    if (link.url === 'https://80e4-1-169-117-157.jp.ngrok.io') {
      // ...navigate to your offers screen
    }
  };

  // React.useEffect(() => {
  //   console.log('use effect')
  //   dynamicLinks()
  //     .getInitialLink()
  //     .then(link => {
  //       console.log(link)
  //       if (link.url === 'https://invertase.io/offer') {
  //         // ...set initial route as offers screen
  //       }
  //     });
  // }, []);

  React.useEffect(() => {
    RN.Linking.addEventListener('url', _handleOpenURL);
    return () => {
      RN.Linking.removeAllListeners('url');
    };
  }, []);

  return (
    <WelcomeStack.Navigator screenOptions={{ headerShown: false }}>
      <WelcomeStack.Group>
        <WelcomeStack.Screen name='Welcome' component={WelcomeScreen}/>
        <WelcomeStack.Screen name='SignUpStep1' component={SignUpStep1Screen}/>
        <WelcomeStack.Screen name='SignUpStep2' component={SignUpStep2Screen}/>
        <WelcomeStack.Screen name='SignUpStep3' component={SignUpStep3Screen}/>
        <WelcomeStack.Screen name='Login' component={LoginScreen}/>
        <WelcomeStack.Screen name='Detail' component={DetailScreen}/>
      </WelcomeStack.Group>
    </WelcomeStack.Navigator>  
  )
}

export default WelcomeStackScreen;