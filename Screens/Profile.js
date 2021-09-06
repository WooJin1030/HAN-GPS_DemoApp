import React, { Component } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ProfileScreen = (props) => {
  function _navigate() {
    props.navigation.navigate("ProfileScreenScreen");
  }

  function _checkLogout() {
    Alert.alert(
      "Alert",
      "Are you sure?",
      [
        { text: "ok", onPress: _logout.bind(this) },
        { text: "cancel", onPress: () => null },
      ],
      { cancelable: true }
    );
  }

  function _logout() {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: "LoginScreen" })],
    });
    props.navigation.dispatch(resetAction);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.wrapButton}
        onPress={_checkLogout.bind(this)}
      >
        <Text>🔓 Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  wrapButton: {
    width: wp("100%"),
    height: hp("8%"),
    paddingLeft: wp("8%"),
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
});

export default ProfileScreen;
