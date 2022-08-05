import * as React from 'react';
import * as RN from 'react-native';
import * as NB from 'native-base';

import _ from 'lodash';
import { SafeAreaView } from "react-native-safe-area-context";

import {
  useRecoilState,
  useRecoilValue
} from 'recoil'

import * as API from '../ApiCenter/CSApiV1Center/CSApi'

import CountryPicker from "react-native-country-picker-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import PhoneInput from '../component/PhoneInput'
import { theme } from '../common/csTheme'

import { signUpInfoState } from '../recoil/atoms/signUpAtom';
import { apiTokenState } from '../recoil/atoms/userAtom'

import SignupScreen from '../../src.org/screens/Signup';

const { width, height } = RN.Dimensions.get('window')

Ionicons.loadFont()

function LoginScreen({ route, navigation }) {

  const myCountryPicker = React.useRef(null);

  // const [signUpInfo, setSignUpInfo] = useRecoilState(signUpInfoState);
  const [apiToken, setApiToken] = useRecoilState(apiTokenState);

  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const [phoneInfo, setPhoneInfo] = React.useState({phoneCallingCode: ['65'],
                                                    phoneCountryCode: 'SG',
                                                    phoneCountryName: 'Singapore',
                                                    phoneNum: ''})
  const [country, setCountry] = React.useState({userCountryCode: 'SG',
                                                userCountryName: 'Singapore'});

  const [fpStatus, setFPStatus] = React.useState(true);

  async function loginAction() {
    // console.log('next action')
    // navigation.navigate('Detail')
    // setIsOpen(true)
    console.log('login screen submit')

    const loginInfo = { countryCode: country.userCountryCode,
                        cellphone: ('+' + phoneInfo.phoneCallingCode[0] + phoneInfo.phoneNum),
                        password: password
                      }
    console.log(loginInfo)
    const response = await API.getToken(loginInfo);
    if (response.status !== 200) {
      RN.Alert.alert(
        "Wanring",
        "Something went wrong"
      );
    } else {
      const headers = response.headers
      setApiToken({token: headers['authorization'], refreshToken: headers['refresh-token']})
      navigation.popToTop()
    }

  }

  function checkAllowToNextStepStatus() {
    console.log(signUpInfo)
    return termsOfUseChecked && fillUpPhone
  }

  function handlePasswordChange(value) {
    setPassword(value)
  }

  // React.useEffect(() => {
  //   setAllowToNextStep(checkAllowToNextStepStatus())
  // }, [checkBoxGroupValue, signUpInfo]);

  function updatePhoneCountry(country) {
    let updatedPhoneInfo = {...phoneInfo};

    updatedPhoneInfo.phoneCallingCode = country.callingCode
    updatedPhoneInfo.phoneCountryCode = country.cca2
    updatedPhoneInfo.phoneCountryName = country.name

    setPhoneInfo(updatedPhoneInfo);
  }

  function updatePhoneNum(phoneNum) {
    let updatedPhoneInfo = {...phoneInfo};
    updatedPhoneInfo.phoneNum = phoneNum

    setPhoneInfo(updatedPhoneInfo);

    if (phoneNum.length > 0) {
      setFPStatus(false)
    } else {
      setFPStatus(true)
    }
  }

  const selectCountry = (selectedCountry) => {
    console.log(country)
    let updatedCountry = {...country}
    updatedCountry.userCountryCode = selectedCountry.cca2
    updatedCountry.userCountryName = selectedCountry.name
    setCountry(updatedCountry)
  };

  function onPressFlag() {
    console.log(myCountryPicker)
    if (myCountryPicker?.current) {
      myCountryPicker?.current?.openModal();
    }
  };
  
  function toSecurityVerify() {
    navigation.navigate('OtpVerify')
  }

  function toSignup() {
    navigation.navigate('SignUpStep1')
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:theme.colors.screenBG}}>
      <NB.NativeBaseProvider theme={theme}>
        <NB.Center flex={1}>
          <NB.Heading mb={141}>Welcome</NB.Heading>
          <NB.FormControl>
            <NB.FormControl.Label _text={{color:'title.black', fontSize:18}} color={'title.black'} ml={4}>Mobile</NB.FormControl.Label>
            <PhoneInput updatePhoneCountry={updatePhoneCountry}
                        updatePhoneNum={updatePhoneNum}
                        phoneInfo={phoneInfo}/>
            <NB.HStack alignItems={'center'}>
              <NB.FormControl.Label _text={{color:'title.black', fontSize:18}} color={'title.black'} ml={4}>Password</NB.FormControl.Label>
              <NB.View flex={1}/>
              <NB.Button disabled={fpStatus} size="sm" variant="link" _text={{color: (fpStatus == false ? 'linkBlue' : 'linkBlueDisable')}} onPress={() => { toSecurityVerify() }}>
                Forgot password?
              </NB.Button>
            </NB.HStack>
            
            <NB.Input
              rounded={'full'}
              w={width - 32}
              mx={4}
              placeholder={'Enter your password'}
              value={password}
              onChangeText={handlePasswordChange}
              style={{ fontSize: 16 }}
              type={showPassword ? "text" : "password"}
              InputRightElement={
                <NB.Icon
                  as={<Ionicons name={(showPassword == true)?'eye-outline':'eye-off-outline'} />}
                  size={"lg"}
                  mx={4}
                  color="black"
                  onPress={() => { setShowPassword(!showPassword)}}
                />
              }
            />
            
          </NB.FormControl>
          <NB.Button mt={20} colorScheme={'csPrimary'} rounded={'full'} width={width - 32} onPress={() => loginAction() }>
            <NB.Text color={'title.black'} fontSize={'xl'} lineHeight={'3xl'}>Log in</NB.Text>
          </NB.Button>
          <NB.View mt={141} w={width} alignItems={'flex-start'}>
            <NB.Button size="sm" variant="link" color={'linkBlue'} onPress={() => { toSignup() }}>
              Create account
            </NB.Button>
          </NB.View>
          
        </NB.Center>
      </NB.NativeBaseProvider>
    </SafeAreaView>
  )
  
}

export default LoginScreen;