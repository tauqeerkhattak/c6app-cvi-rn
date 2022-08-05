import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spinner } from "native-base";
import { useIsFocused } from "@react-navigation/native";
import Logo from "../components/Logo";

const SplashScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const gotoWelcome = () => {
    navigation.navigate("Welcome");
  };

  useEffect(() => {
    let timeout = null;
    if (isFocused) {
      timeout = setTimeout(gotoWelcome, 5000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Spinner size="lg" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
});

export default SplashScreen;
