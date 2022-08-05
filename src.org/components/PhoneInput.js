import React, { useState, useRef, useEffect, useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Input, View } from "native-base";
import CountryPicker from "react-native-country-picker-modal";

const styles = StyleSheet.create({
  container: {},
});

const PhoneInput = (props) => {
  const [cca2, setCca2] = useState("SG");

  const countryPicker = useRef(null);
  const phone = useRef(null);

  const onPressFlag = () => {
    if (countryPicker?.current) {
      countryPicker?.current?.openModal();
    }
  };

  const selectCountry = (country) => {
    setCca2(country.cca2);
  };

  return (
    <View style={styles.container}>
      <Input
        {...props}
        ref={phone}
        // value={value}
        // onChangeText={setValue}
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
              countryCode={cca2}
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
