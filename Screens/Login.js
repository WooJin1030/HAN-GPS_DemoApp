import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { _onValueChange, _getFromStorage } from "../Storage";

const LoginScreen = (props) => {
  const BaseURL = "https://www.gpsdemo.shop/";
  const STORAGE_KEY = "id_token";

  const [idInput, setIdInput] = useState("");
  const [pwdInput, setPwdInput] = useState("");
  const [userInfo, setUserInfo] = useState({
    isPossible: false,
  });

  // login api
  // 로그인 가능한지 여부 / Storage에 저장
  const Login = async (id, passwd) => {
    await axios
      .post(`${BaseURL}users/login`, {
        id,
        passwd,
      })
      .then((response) => {
        const userLoginPossible = response.data.isSuccess;
        const userToken = response.data.result.jwt;

        setUserInfo({
          isPossible: userLoginPossible,
        });

        _onValueChange(STORAGE_KEY, userToken);
        // _getFromStorage();
      })
      .catch((err) => console.log(err));
  };

  // 로그인 성공시 탭 이동
  const moveProfile = () => {
    if (userInfo.isPossible) {
      props.navigation.replace("TabNavigator");
    } else {
      alert("Not a member!");
    }
  };

  // 로그인
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

  // 회원가입 화면으로 전환
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
