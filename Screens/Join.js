import React, { Component, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { postMember, getUserInfo } from "../api";

const JoinScreen = (props) => {
  const [idInput, setIdInput] = useState("");
  const [pwdInput, setPwdInput] = useState("");
  const [checkPwdInput, setCheckPwdInput] = useState("");

  // 회원 가입 성공시 로그인 다시 로그인 창으로 이동
  function _doLogin() {
    props.navigation.replace("LoginScreen");
  }

  // 뒤로(로그인) 가기
  function _moveLogin() {
    props.navigation.replace("LoginScreen");
  }

  // 회원 가입 알림
  function _checkJoin() {
    // getUserInfo(5);
    if (!idInput.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!pwdInput.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (!checkPwdInput.trim()) {
      alert("비밀번호를 한번 더 입력해주세요.");
      return;
    }

    if (pwdInput === checkPwdInput) {
      postMember(idInput, pwdInput);
    }

    Alert.alert(
      "환영합니다!",
      "가입이 완료되었습니다.",
      [
        { text: "확인", onPress: _doLogin.bind(this) },
        { text: "취소", onPress: () => null },
      ],
      { cancelable: true }
    );
  }

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
          value={idInput}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.textForm}
          placeholder={"Password"}
          onChangeText={(text) => setPwdInput(text)}
          value={pwdInput}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.textForm}
          placeholder={"Check Password"}
          onChangeText={(text) => setCheckPwdInput(text)}
          value={checkPwdInput}
        />
      </View>
      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.button} onPress={_checkJoin.bind(this)}>
          <Text style={styles.buttonTitle}>가입</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.button} onPress={_moveLogin.bind(this)}>
          <Text style={styles.buttonTitle}>로그인으로 돌아가기</Text>
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
    marginBottom: 8,
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

export default JoinScreen;
