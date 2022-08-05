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

import { signUpInfoState } from '../recoil/atoms/signUpAtom';
import SignupScreen from '../../src.org/screens/Signup';

const { width, height } = RN.Dimensions.get('window')

Ionicons.loadFont()

function SignUpStep1Screen({ route, navigation }) {

  // const [signUpInfo, setSignUpInfo] = useRecoilState(signUpInfoState);
  const [checkBoxGroupValue, setCheckBoxGroupValue] = React.useState([]);
  const [allowToNextStep, setAllowToNextStep] = React.useState(false);

  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);

  const signUpInfo = useRecoilValue(signUpInfoState)

  function nextAction() {
    // console.log('next action')
    // navigation.navigate('Detail')
    setIsOpen(true)
  }

  function checkAllowToNextStepStatus() {
    console.log(signUpInfo)
    const termsOfUseChecked = _.find(checkBoxGroupValue, function(o) { return o === 'TermsOfUse'; }) ? true: false;
    const fillUpPhone = signUpInfo.phone !== '' ? true : false;
    return termsOfUseChecked && fillUpPhone
  }

  function phoneConfirm(confirmState) {
    setIsOpen(false)

    if (confirmState == true) {
      navigation.push('SignUpStep2')
    }
  }

  React.useEffect(() => {
    setAllowToNextStep(checkAllowToNextStepStatus())
  }, [checkBoxGroupValue, signUpInfo]);

  return (
    <SafeAreaView style={{flex:1, backgroundColor:theme.colors.screenBG}}>
      <NB.NativeBaseProvider theme={theme}>
        <NB.Center flex={1}>
          <NB.Heading mb={141}>Welcome</NB.Heading>
          <NB.FormControl>
            <NB.FormControl.Label _text={{color:'title.black', fontSize:18}} color={'title.black'} ml={4}>Mobile</NB.FormControl.Label>
            <PhoneInput/>
            <NB.Checkbox.Group colorScheme="csPrimary"
                               defaultValue={checkBoxGroupValue}
                               onChange={values => {
                                console.log(values);
                                setCheckBoxGroupValue(values || []);
                               }}>
              <NB.HStack height={50} m={4} alignItems="center">
                <NB.Checkbox _text={{color:'title.black', fontSize: 12}} colorScheme={'csPrimary'} value="TermsOfUse">
                  I agree to C6's
                </NB.Checkbox>
                <NB.Text fontSize={'xs'} color={'blue.500'}> Terms<NB.Text color={'title.black'}> & </NB.Text><NB.Text color={'blue.500'}>Conditions and Privacy Policy</NB.Text></NB.Text>
              </NB.HStack>
            </NB.Checkbox.Group>
            
          </NB.FormControl>
          <NB.Button disabled={!allowToNextStep} mt={0} colorScheme={'csPrimary'} rounded={'full'} width={width - 32} onPress={() => nextAction() }>
            <NB.Text color={'title.black'} fontSize={'xl'} lineHeight={'3xl'}>Next</NB.Text>
          </NB.Button>
          <NB.View mt={141}></NB.View>
          <NB.AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
            <NB.AlertDialog.Content>
              <NB.Center px={4}>
                <NB.Text mt={4}>Double-check that this is your number</NB.Text>
                <NB.HStack alignItems={'center'}>
                  <CountryPicker
                    translation="eng"
                    withCountryNameButton={false}
                    cca2={signUpInfo.phoneCountryCode}
                    countryCode={signUpInfo.phoneCountryCode}
                  />
                  <NB.Text fontSize={'2xl'}>+{signUpInfo.phoneCallingCode[0]} </NB.Text>
                  <NB.Text fontSize={'2xl'}>{signUpInfo.phone}</NB.Text>
                </NB.HStack>
                <NB.Text mt={4} color={'alert.red'}>If the number is wrong, you may not be able to reset your password.</NB.Text>
              </NB.Center>
              <NB.HStack space={2} px={4} py={6}>
                <NB.Button rounded={'full'} flex={1} onPress={() => { phoneConfirm(false) }}>NO</NB.Button>
                <NB.Button rounded={'full'} flex={1} onPress={() => { phoneConfirm(true) }}>YES</NB.Button>
              </NB.HStack>
            </NB.AlertDialog.Content>
          </NB.AlertDialog>
        </NB.Center>
      </NB.NativeBaseProvider>
    </SafeAreaView>
  )
  
}

export default SignUpStep1Screen;