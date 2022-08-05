import { Button, Icon, Text } from "native-base";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { SafeAreaView } from "react-native-safe-area-context";
import PasswordInput from "../components/PasswordInput";
import PhoneInput from "../components/PhoneInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Title from "../components/Title";
import { CommonActions } from "@react-navigation/native";
import i18n from "../utils/i18n";

const LoginScreen = ({ navigation }) => {
  useEffect(() => {
    const headerLeft = () => (
      <Icon
        as={<Ionicons name="arrow-back" />}
        size={"lg"}
        color="black"
        onPress={navigation.goBack}
      />
    );
    navigation.setOptions({
      headerShown: true,
      headerBackVisible: false,
      headerTitleAlign: "center",
      headerLeft,
      headerTitle: "",
      headerRight: () => null,
    });
  }, [navigation]);

  const goHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "HomeTabs" }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        extraHeight={350}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.loginForm}>
          <Title title={i18n.t("LOGIN.TITLE")} />
          <View style={styles.formRow}>
            <PhoneInput />
          </View>
          <View style={styles.formRow}>
            <PasswordInput />
          </View>

          <View style={styles.captionView}>
            <Text color="blue.300">{i18n.t("LOGIN.FORGOT_PASSOWRD")}</Text>
          </View>

          <View style={styles.buttonView}>
            <Button backgroundColor="gray.500" width="1/2" onPress={goHome}>
              {i18n.t("LOGIN.NEXT_BUTTON")}
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  loginForm: {
    width: "90%",
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  formRow: {
    marginVertical: 10,
  },
  captionView: {
    marginBottom: 10,
  },
  buttonView: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default LoginScreen;
