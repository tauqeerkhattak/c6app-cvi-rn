import * as React from 'react';
import * as RN from 'react-native';
import * as NB from 'native-base';

import _ from 'lodash';
import { SafeAreaView } from "react-native-safe-area-context";

import {
  useRecoilState,
  useRecoilValue
} from 'recoil'

import CountryPicker from "react-native-country-picker-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import PhoneInput from '../component/PhoneInput'
import { theme } from '../common/csTheme'

import {useCountdown} from '../component/useCountdown';

import { signUpInfoState } from '../recoil/atoms/signUpAtom';
import SignupScreen from '../../src.org/screens/Signup';
import CountdownTimer from '../component/countdownTimer';

const { width, height } = RN.Dimensions.get('window')

Ionicons.loadFont()

function OtpVerifyScreen({ route, navigation }) {

  const FIVE_MINUTES = 5 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterFiveMinutes = NOW_IN_MS + FIVE_MINUTES;

  const [allowToNextStep, setAllowToNextStep] = React.useState(false);
  const [otpCode, setOtpCode] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  // const [days, hours, minutes, seconds] = useCountdown(dateTimeAfterFiveMinutes);
  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);

  function nextAction() {

  }

  function leaveAction(leave) {
    if (leave == true) {
      navigation.goBack()
    } else {
      setIsOpen(false)
    }
  }

  function handleOTPChange(value) {
    setOtpCode(value)
  }
  // function checkAllowToNextStepStatus() {
  //   console.log(signUpInfo)
  //   const termsOfUseChecked = _.find(checkBoxGroupValue, function(o) { return o === 'TermsOfUse'; }) ? true: false;
  //   const fillUpPhone = signUpInfo.phone !== '' ? true : false;
  //   return termsOfUseChecked && fillUpPhone
  // }

  // React.useEffect(() => {
  //   setAllowToNextStep(checkAllowToNextStepStatus())
  // }, [checkBoxGroupValue, signUpInfo]);

  React.useLayoutEffect(() => {
    console.log('123')
    navigation.setOptions({
      headerTintColor: 'black',
      title: 'Security Verification', 
      headerLeft: () => (
        <RN.TouchableWithoutFeedback onPress={ () => { setIsOpen(true) }}>
          <RN.View style={{padding:4, justifyContent:'center', alignItems:'center'}}>
            <Ionicons name={'chevron-back'} size={20} color={'black'} />
          </RN.View>
        </RN.TouchableWithoutFeedback>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{flex:1, backgroundColor:theme.colors.screenBG}}>
      <NB.NativeBaseProvider theme={theme}>
        <NB.Center flex={1}>
          <NB.Heading mb={141}>Welcome</NB.Heading>
          <NB.FormControl>
            <NB.FormControl.Label _text={{color:'title.black', fontSize:14}} color={'title.black'} ml={4}>Enter the 6-digit code sent to +6512****78 via SMS</NB.FormControl.Label>
            <NB.Input
              rounded={'full'}
              w={width - 32}
              mx={4}
              mt={10}
              placeholder={'Enter the 6-digit code'}
              value={otpCode}
              onChangeText={handleOTPChange}
              style={{ fontSize: 16 }}
            />
            <CountdownTimer targetDate={dateTimeAfterFiveMinutes}/>
          </NB.FormControl>
          <NB.Button disabled={!allowToNextStep} mt={0} colorScheme={'csPrimary'} rounded={'full'} width={width - 32} onPress={() => nextAction() }>
            <NB.Text color={'title.black'} fontSize={'xl'} lineHeight={'3xl'}>Next</NB.Text>
          </NB.Button>
          <NB.View mt={141}></NB.View>
          <NB.AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
            <NB.AlertDialog.Content>
              <NB.Center px={4}>
                <NB.Text fontSize={'md'} fontWeight={'semibold'} mt={4}>Are you sure you want to leave?</NB.Text>
                <NB.Text mt={4} color={'title.black'} fontSize={'sm'}>If you leave now, you’ll need to wait up to 1minute before starting again. Let’s continue?</NB.Text>
              </NB.Center>
              <NB.HStack space={2} px={4} py={6}>
                <NB.Button _text={{color:'title.black'}} bg={'csPrimary.100'} colorScheme={'csPrimary'} rounded={'full'} flex={1} onPress={() => { leaveAction(true) }}>Leave</NB.Button>
                <NB.Button _text={{color:'title.black'}} bg={'csPrimary.100'} colorScheme={'csPrimary'} rounded={'full'} flex={1} onPress={() => { leaveAction(false) }}>Continue</NB.Button>
              </NB.HStack>
            </NB.AlertDialog.Content>
          </NB.AlertDialog>
        </NB.Center>
      </NB.NativeBaseProvider>
    </SafeAreaView>
  )
  
}

export default OtpVerifyScreen;