import React from "react";
import * as RN from 'react-native'
import * as NB from 'native-base';

const { width, height } = RN.Dimensions.get('window')

function homeSigninSignup(props) {
  return (
    <NB.Box w={width} p={4} bgColor={'white'}>
      <NB.Text p={6} fontSize='xl'>Sign-up / login to start earning rewards!</NB.Text>
      <NB.HStack space={3}>
        <NB.Button bgColor={'primary50'} _text={{color:'title.black'}} rounded={'full'} h={44} flex={1} onPress={() => { props.toLoginAction() }}>Log in</NB.Button>
        <NB.Button colorScheme={'csPrimary'} _text={{color:'title.black'}} rounded={'full'} h={44} flex={1} onPress={() => { props.toSignupAction() }}>Sign up</NB.Button>
      </NB.HStack>
    </NB.Box>
  )
}

export default homeSigninSignup;
