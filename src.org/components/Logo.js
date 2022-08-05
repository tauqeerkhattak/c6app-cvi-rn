import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "native-base";
import i18n from "../utils/i18n";


const Logo = () => {
  return (
    <View style={styles.logoView}>
      <Text style={styles.logoText}>{i18n.t('SPLASH.LOGO')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoView: {
    height: 170,
    width: 170,
    borderRadius: 85,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc",
    marginBottom: 50,
  },
  logoText: {
    fontSize: 20,
    color: "#000",
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    marginBottom: 50,
  },
});

export default Logo;
