import React, { useState, useRef, useEffect, useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Input, View } from "native-base";
import CountryPicker from "react-native-country-picker-modal";

const styles = StyleSheet.create({
  container: {},
});

const SelectCountry = (props) => {
  const [cca2, setCca2] = useState("SG");
  const [countryName, setCountryName] = useState("Singapore");

  const countryPicker = useRef(null);
  // const phone = useRef(null);

  const onPressFlag = () => {
    if (countryPicker?.current) {
      countryPicker?.current?.openModal();
    }
  };

  const selectCountry = (country) => {
    setCca2(country.cca2);
    setCountryName(country.name);
  };

  return (
    <View style={styles.container}>
      <Input
        {...props}
        // wrapperRef={phone}
        value={countryName || ""}
        editable={false}
        onPressIn={onPressFlag}
        // onChangeText={setValue}
        style={{ fontSize: 16 }}
        InputLeftElement={
          <TouchableOpacity style={{ paddingLeft: 12 }} onPress={onPressFlag}>
            <CountryPicker
              ref={countryPicker}
              onSelect={selectCountry}
              translation="eng"
              withModal
              withCountryNameButton={true}
              // cca2={cca2}
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

export default SelectCountry;
