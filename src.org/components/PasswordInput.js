import React, { useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Icon, Input, Text, View } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

MaterialIcons.loadFont()
const PasswordInput = (props) => {
  const [secure, setSecure] = useState(true);

  const toggleSecure = useCallback(() => {
    setSecure(!secure);
  }, [secure]);

  return (
    <View style={styles.container}>
      <Input
        {...props}
        // secureTextEntry={secure}
        type={secure ? "password" : "text"}
        InputRightElement={
          <Icon
            as={
              <MaterialIcons name={secure ? "visibility-off" : "visibility"} />
            }
            size={5}
            mr="2"
            color="muted.400"
            onPress={toggleSecure}
          />
        }
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default PasswordInput;
