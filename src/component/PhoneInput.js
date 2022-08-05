import React, { useState, useRef, useEffect, useCallback } from "react";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Input, View } from "native-base";
import CountryPicker from "react-native-country-picker-modal";

import { signUpInfoState } from '../recoil/atoms/signUpAtom';

import {
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {},
});

const PhoneInput = (props) => {
  const [signUpInfo, setSignUpInfo] = useRecoilState(signUpInfoState)
  // const [cca2, setCca2] = useState("SG");
  // const [phone, setPhone] = useState('');

  const countryPicker = useRef(null);

  const onPressFlag = () => {
    if (countryPicker?.current) {
      countryPicker?.current?.openModal();
    }
  };

  const selectCountry = (country) => {
    console.log(country)
    if (!!props.updatePhoneCountry) {
      props.updatePhoneCountry(country)
    } else {
      let updatedSignUpInfo = {...signUpInfo}
      updatedSignUpInfo.phoneCallingCode = country.callingCode
      updatedSignUpInfo.phoneCountryCode = country.cca2
      updatedSignUpInfo.phoneCountryName = country.name
      setSignUpInfo(updatedSignUpInfo)
    }
  };

  const handlePhoneChange = (value) => {
    if (!!props.updatePhoneNum) {
      props.updatePhoneNum(value)
    } else {
      let updatedSignUpInfo = {...signUpInfo}
      updatedSignUpInfo.phone = value
      setSignUpInfo(updatedSignUpInfo)
    }
  }

  const cca2 = (!!props.phoneInfo) ? props.phoneInfo.phoneCountryCode : signUpInfo.phoneCountryCode
  const countryCode = (!!props.phoneInfo) ? props.phoneInfo.phoneCountryCode : signUpInfo.phoneCountryCode
  const phoneNum = (!!props.phoneInfo) ? props.phoneInfo.phoneNum : signUpInfo.phone
  return (
    <View style={styles.container}>
      <Input
        {...props}
        w={width - 32}
        mx={4}
        placeholder={'Enter mobile number'}
        value={phoneNum}
        onChangeText={handlePhoneChange}
        style={{ fontSize: 16 }}
        InputLeftElement={
          <TouchableOpacity onPress={onPressFlag}>
            <CountryPicker
              ref={countryPicker}
              onSelect={selectCountry}
              translation="eng"
              withModal
              withCountryNameButton={false}
              withCallingCode={true}
              withCallingCodeButton
              cca2={cca2}
              countryCode={countryCode}
            >
              <View />
            </CountryPicker>
          </TouchableOpacity>
        }
        keyboardType="phone-pad"
      />
    </View>
  );
};

export default PhoneInput;
