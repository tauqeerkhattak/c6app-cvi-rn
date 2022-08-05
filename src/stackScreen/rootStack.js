import * as React from 'react';
import * as RN from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  useRecoilState,
} from 'recoil';

import { apiTokenState } from '../recoil/atoms/userAtom';

import MainStackScreen from './mainStack';
import WelcomeStackScreen from './welcomeStack';

import DetailScreen from '../screen/detailScreen';
import WelcomeScreen from '../screen/welcomeScreen'
import SignUpStep1Screen from '../screen/signUpStep1Screen'
import SignUpStep2Screen from '../screen/signUpStep2Screen'
import SignUpStep3Screen from '../screen/signUpStep3Screen'
import LoginScreen from '../screen/loginScreen'
import OtpVerifyScreen from '../screen/otpVerifyScreen';
import EWalletScreen from "../screen/eWalletScreen";

const RootStack = createNativeStackNavigator();

function ModalScreen({ navigation }) {
  return (
    <RN.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <RN.Text style={{ fontSize: 30 }}>This is a modal!</RN.Text>
      <RN.Button onPress={() => navigation.goBack()} title="Dismiss" />
    </RN.View>
  );
}

function RootStackScreen({ navigation, route }) {
  // const [apiToken, setApiToken] = useRecoilState(apiTokenState)
  // console.log(apiToken)

  // if (!apiToken) {
  //   console.log('it is null')
  //   return (
  //     <WelcomeStackScreen/>
  //   )
  // }

  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen
          name='MainStack'
          component={MainStackScreen}
        />
        <RootStack.Screen name='Details' component={DetailScreen}/>
        <RootStack.Screen name='Welcome' component={WelcomeScreen}/>
        <RootStack.Screen name='SignUpStep1' options={{ title: '' }} component={SignUpStep1Screen}/>
        <RootStack.Screen name='SignUpStep2' options={{ title: '' }} component={SignUpStep2Screen}/>
        <RootStack.Screen name='SignUpStep3' options={{ title: '' }} component={SignUpStep3Screen}/>
        <RootStack.Screen name='Login' component={LoginScreen}/>
        <RootStack.Screen name='OtpVerify' component={OtpVerifyScreen}/>
          <RootStack.Screen name='EWalletScreen' component={EWalletScreen} options={{ headerShown: false }}/>
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="MyModal" component={ModalScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

export default RootStackScreen;
