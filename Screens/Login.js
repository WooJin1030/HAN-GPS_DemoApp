import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LoginScreen = (props) => {
  const [idInput, setIdInput] = useState("");
  const [pwdInput, setPwdInput] = useState("");

  const [userInfo, setUserInfo] = useState({
    isPossible: false,
  });
  const BaseURL = "https://www.gpsdemo.shop/";

  const Login = async (id, passwd) => {
    await axios
      .post(`${BaseURL}users/login`, {
        id,
        passwd,
      })
      .then((response) => {
        const userLoginPossible = response.data.isSuccess;
        console.log(userLoginPossible);
        setUserInfo({
          isPossible: userLoginPossible,
        });
      })
      .catch((err) => console.log(err));
  };

  const moveProfile = () => {
    if (userInfo.isPossible) {
      props.navigation.replace("TabNavigator");
    } else {
      alert("Not a member!");
    }
  };

  const _doLogin = () => {
    if (!idInput.trim()) {
      alert("Please Enter Your ID");
      return;
    }
    if (!pwdInput.trim()) {
      alert("Please Enter Your password");
      return;
    }

    // Login(idInput, pwdInput)
    console.log(userInfo);
    moveProfile();
  };

  function _doJoin() {
    props.navigation.replace("JoinScreen");
  }

  useEffect(() => {
    if (idInput && pwdInput) Login(idInput, pwdInput);
  }, [pwdInput, idInput]);

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.title}>GPS APP</Text>
      </View>
      <View style={styles.formArea}>
        <TextInput
          style={styles.textForm}
          placeholder={"ID"}
          onChangeText={(text) => setIdInput(text)}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.textForm}
          placeholder={"Password"}
          onChangeText={(text) => setPwdInput(text)}
        />
      </View>
      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.button} onPress={_doLogin.bind(this)}>
          <Text style={styles.buttonTitle}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={_doJoin.bind(this)}>
          <Text style={styles.buttonTitle}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: wp("10%"),
    paddingRight: wp("10%"),
    justifyContent: "center",
    paddingBottom: 100,
  },
  titleArea: {
    width: "100%",
    padding: wp("10%"),
    alignItems: "center",
  },
  title: {
    fontSize: wp("10%"),
  },
  formArea: {
    width: "100%",
    paddingBottom: wp("10%"),
  },
  textForm: {
    borderWidth: 0.5,
    borderColor: "#888",
    width: "100%",
    height: hp("5%"),
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
  },
  buttonArea: {
    width: "100%",
    height: hp("5%"),
  },
  button: {
    backgroundColor: "#46c3ad",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 7,
  },
  buttonTitle: {
    color: "white",
  },
});

export default LoginScreen;
