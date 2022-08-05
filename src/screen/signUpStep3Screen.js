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
import { apiTokenState } from '../recoil/atoms/userAtom';

import * as API from '../ApiCenter/CSApiV1Center/CSApi'

const { width, height } = RN.Dimensions.get('window')

Ionicons.loadFont()

function SignUpStep3Screen({ route, navigation }) {

  const [signUpInfo, setSignUpInfo] = useRecoilState(signUpInfoState);
  const [apiToken, setApiToken] = useRecoilState(apiTokenState);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [allowToNextStep, setAllowToNextStep] = React.useState(false);


  async function completeAction() {
    console.log('complete action')
    const formateCheckStatus = checkPasswordMechanism1() && 
                               checkPasswordMechanism2() &&
                               checkPasswordMechanism3() &&
                               (password === confirmPassword)
    console.log(formateCheckStatus)
    if (formateCheckStatus == false) {
      RN.Alert.alert(
        "Wanring",
        "Password does not meet the principle"
      );
    } else {
      let updatedSignUpInfo = {...signUpInfo}
      updatedSignUpInfo.password = password
      setSignUpInfo(updatedSignUpInfo)
      const response = await API.signUp(updatedSignUpInfo);
      console.log(response)
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
  }

  function checkAllowToNextStepStatus() {
    console.log(signUpInfo)
    const fillUpName = signUpInfo.name !== '' ? true : false;
    return fillUpName
  }

  function handlePasswordChange(value) {
    setPassword(value)
  }

  function handleConfirmPasswordChange(value) {
    setConfirmPassword(value)
  }

  React.useEffect(() => {
    setAllowToNextStep(checkAllowToNextStepStatus())
  }, [signUpInfo]);

  const checkPasswordMechanism1 = () => {
    if (password.length < 8) {
      return false
    }
    return true
  }

  const checkPasswordMechanism2 = () => {
    var pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z]).+$"
    );
    return pattern.test(password)
  }

  const checkPasswordMechanism3 = () => {
    var hasNumber = /\d/;   
    return hasNumber.test(password);
  }

  function generatePassword() {
    let newPassword = '';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const num = '0123456789';

    newPassword += upper.charAt(Math.floor(Math.random()* 26));
    newPassword += lower.charAt(Math.floor(Math.random()* 26));
    newPassword += num.charAt(Math.floor(Math.random()* 10));

    for (let i = 1; i <= 8; i++) {
        const combineStr = upper + lower + num;
        const char = Math.floor(Math.random()
                    * combineStr.length + 1);
          
        newPassword += combineStr.charAt(char)
    }
    setPassword(newPassword)
    setConfirmPassword(newPassword)
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:theme.colors.screenBG}}>
      <NB.NativeBaseProvider theme={theme}>
        <NB.Center flex={1}>
          <NB.Heading mb={141}>Welcome</NB.Heading>
          <NB.FormControl>
            <NB.HStack alignItems={'center'}>
            <NB.FormControl.Label _text={{color:'title.black', fontSize:18}} color={'title.black'} ml={4}>Password</NB.FormControl.Label>
            <NB.View flex={1}/>
            <NB.Button size="sm" variant="ghost" color={'linkBlue'} onPress={() => { generatePassword() }}>
              Auto create password
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
            <NB.HStack alignItems={'center'}>
              <NB.Icon
                as={<Ionicons name='checkmark-circle' />}
                size={'md'}
                ml={4}
                mr={1}
                mt={2}
                color= {(checkPasswordMechanism1() == true? 'csPrimary.600' : 'mute')}
                onPress={() => { setShowPassword(!showPassword)}}
              />
              <NB.FormControl.HelperText _text={{color: (checkPasswordMechanism1() == true? 'csPrimary.600' : 'mute'), fontSize: 14}}>
                8 characters or more
              </NB.FormControl.HelperText>
            </NB.HStack>
            <NB.HStack alignItems={'center'}>
              <NB.Icon
                as={<Ionicons name='checkmark-circle' />}
                size={'md'}
                ml={4}
                mr={1}
                mt={2}
                color={(checkPasswordMechanism2() == true? 'csPrimary.600' : 'mute')}
                onPress={() => { setShowPassword(!showPassword)}}
              />
              <NB.FormControl.HelperText _text={{color: (checkPasswordMechanism2() == true? 'csPrimary.600' : 'mute'), fontSize: 14}}>
                Mix of upper & lowercase letters
              </NB.FormControl.HelperText>
            </NB.HStack><NB.HStack alignItems={'center'}>
              <NB.Icon
                as={<Ionicons name='checkmark-circle' />}
                size={'md'}
                ml={4}
                mr={1}
                mt={2}
                color={(checkPasswordMechanism3() == true? 'csPrimary.600' : 'mute')}
                onPress={() => { setShowPassword(!showPassword)}}
              />
              <NB.FormControl.HelperText _text={{color: (checkPasswordMechanism3() == true? 'csPrimary.600' : 'mute'), fontSize: 14}}>
                Contains at least one number
              </NB.FormControl.HelperText>
            </NB.HStack>
            <NB.Input
              rounded={'full'}
              w={width - 32}
              mx={4}
              mt={6}
              placeholder={'Repeat password'}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              style={{ fontSize: 16 }}
              type={showConfirmPassword ? "text" : "password"}
              InputRightElement={
                <NB.Icon
                  as={<Ionicons name={(showConfirmPassword == true)?'eye-outline':'eye-off-outline'} />}
                  size={"lg"}
                  mx={4}
                  color="black"
                  onPress={() => { setShowConfirmPassword(!showConfirmPassword)}}
                />
              }
            />
          </NB.FormControl>
          <NB.Button disabled={!allowToNextStep} mt={20} colorScheme={'csPrimary'} rounded={'full'} width={width - 32} onPress={() => completeAction() }>
            <NB.Text color={'title.black'} fontSize={'xl'} lineHeight={'3xl'}>Complete</NB.Text>
          </NB.Button>
          <NB.View mt={141}></NB.View>
        </NB.Center>
      </NB.NativeBaseProvider>
    </SafeAreaView>
  )
  
}

export default SignUpStep3Screen;