import * as React from 'react';
import * as RN from 'react-native';
import * as NB from 'native-base';

import { NavigationContainer } from '@react-navigation/native';

import {
  RecoilRoot,
} from 'recoil';

import codePush from "react-native-code-push";
import RootStackScreen from './src/stackScreen/rootStack';

const codePushOptions = {
  checkFrequency: __DEV__ ? codePush.CheckFrequency.ON_APP_RESUME : codePush.CheckFrequency.ON_APP_RESUME,
  // other options
};

function App() {
  return (
    <React.Suspense fallback={
      <NB.NativeBaseProvider>
        <NB.Center flex={1}>
          <NB.Center w={220} h={220} rounded={'full'} bgColor={'#FF745C'}>
            <NB.Text fontSize={'5xl'}>LOGO</NB.Text>
          </NB.Center>
          <NB.Spinner mt={12} mb={2} color="#FF745C" />
          <NB.Text fontSize={'sm'}>Loading</NB.Text>
        </NB.Center>
      </NB.NativeBaseProvider>
    }>
    <RecoilRoot>
      <NavigationContainer>
        <RootStackScreen/>
      </NavigationContainer>
    </RecoilRoot>
    </React.Suspense>
  );
}

export default codePush(codePushOptions)(App);