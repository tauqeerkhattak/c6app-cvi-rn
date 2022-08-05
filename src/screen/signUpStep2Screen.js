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

function SignUpStep2Screen({ route, navigation }) {

  const [signUpInfo, setSignUpInfo] = useRecoilState(signUpInfoState);
  const [allowToNextStep, setAllowToNextStep] = React.useState(false);

  const myCountryPicker = React.useRef(null);

  function nextAction() {
    console.log('step 2 next action')
    navigation.navigate('SignUpStep3')
    // setIsOpen(true)
  }

  function checkAllowToNextStepStatus() {
    console.log(signUpInfo)
    const fillUpName = signUpInfo.name !== '' ? true : false;
    return fillUpName
  }

  // phoneConfirm = (confirmState) => {
  //   setIsOpen(false)

  //   if (confirmState == true) {
  //     navigation.navigate('Detail')
  //   }
  // }

  function handleNameChange(value) {
    let updatedSignUpInfo = {...signUpInfo}
    updatedSignUpInfo.name = value
    setSignUpInfo(updatedSignUpInfo)
  }

  const selectCountry = (country) => {
    console.log(country)
    let updatedSignUpInfo = {...signUpInfo}
    updatedSignUpInfo.userCountryCode = country.cca2
    updatedSignUpInfo.userCountryName = country.name
    setSignUpInfo(updatedSignUpInfo)
  };

  function onPressFlag() {
    console.log(myCountryPicker)
    if (myCountryPicker?.current) {
      myCountryPicker?.current?.openModal();
    }
  };

  React.useEffect(() => {
    setAllowToNextStep(checkAllowToNextStepStatus())
  }, [signUpInfo]);

  return (
    <SafeAreaView style={{flex:1, backgroundColor:theme.colors.screenBG}}>
      <NB.NativeBaseProvider theme={theme}>
        <NB.Center flex={1}>
          <NB.Heading mb={141}>Welcome</NB.Heading>
          <NB.FormControl>
            <NB.FormControl.Label _text={{color:'title.black', fontSize:18}} color={'title.black'} ml={4}>Name</NB.FormControl.Label>
              <NB.Input
                rounded={'full'}
                w={width - 32}
                mx={4}
                placeholder={'What should people call you?'}
                value={signUpInfo.name}
                onChangeText={handleNameChange}
                style={{ fontSize: 16 }}
              />
            <NB.FormControl.Label _text={{color:'title.black', fontSize:18}} color={'title.black'} ml={4}>City / Country</NB.FormControl.Label>
            <NB.Pressable onPress={() => onPressFlag() }>
              <NB.HStack px={3} mx={4} borderWidth={1} rounded={'full'} borderColor={'gray.300'} alignItems={'center'}>
                <CountryPicker
                  ref={myCountryPicker}
                  onSelect={selectCountry}
                  translation="eng"
                  cca2={signUpInfo.userCountryCode}
                  countryCode={signUpInfo.userCountryCode}
                />
                <NB.Text color={'title.black'} fontSize={'xl'} lineHeight={'md'}>{signUpInfo.userCountryName}</NB.Text>
                <NB.View flex={1}/>
                <NB.Icon
                  as={<Ionicons name="chevron-down-outline" />}
                  size={"lg"}
                  color={theme.colors.gray4}
                />
              </NB.HStack>
            </NB.Pressable>
          </NB.FormControl>
          <NB.Button disabled={!allowToNextStep} mt={20} colorScheme={'csPrimary'} rounded={'full'} width={width - 32} onPress={() => nextAction() }>
            <NB.Text color={'title.black'} fontSize={'xl'} lineHeight={'3xl'}>Next</NB.Text>
          </NB.Button>
          <NB.View mt={141}></NB.View>
        </NB.Center>
      </NB.NativeBaseProvider>
    </SafeAreaView>
  )
  
}

export default SignUpStep2Screen;