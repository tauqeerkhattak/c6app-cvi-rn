import { Button, Checkbox, Icon, Text } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
// import PasswordInput from "../components/PasswordInput";
import PhoneInput from "../components/PhoneInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Title from "../components/Title";
//import AlertModal from "../components/AlertModal";
import i18n from "../utils/i18n";

const SignupScreen = ({ navigation }) => {
  const [phone, setPhone] = useState("");

  const alert = useRef(null);
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

  const signUp = () => {
    if (alert?.current) {
      alert?.current.show();
    }
  };

  const next = () => {
    navigation.navigate("BasicDetails");
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
          <Title title={i18n.t("SIGNUP.TITLE")} />
          <View style={styles.formRow}>
            <PhoneInput value={phone} onChangeText={setPhone} />
          </View>
          <View style={styles.captionView}>
            <Checkbox
              shadow={2}
              value="test"
              accessibilityLabel="i_agree"
              defaultIsChecked
            >
              <Text>
                {i18n.t("SIGNUP.CHECKBOX_TEXT")}
                <Text
                  color={"blue.500"}
                  onPress={() => {
                    console.log("terms");
                  }}
                >
                  {i18n.t("SIGNUP.TERMS_TEXT")}
                </Text>
              </Text>
            </Checkbox>
          </View>

          <View style={styles.buttonView}>
            <Button backgroundColor="gray.500" width="1/2" onPress={signUp}>
              {i18n.t("SIGNUP.NEXT_BUTTON")}
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

export default SignupScreen;
