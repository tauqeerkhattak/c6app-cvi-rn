import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Title = ({ title }) => {
  return (
    <View style={styles.titleView}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleView: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Title;
