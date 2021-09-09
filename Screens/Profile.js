import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { _getFromStorage } from "../Storage";

const ProfileScreen = (props) => {
  const STORAGE_KEY = "id_token";
  const BaseURL = "https://www.gpsdemo.shop/";

  const [jwt, setJwt] = useState("");
  const [userIdx, setUserIdx] = useState("");

  let headers = {
    headers: {
      "X-ACCESS-TOKEN": jwt,
    },
  };

  let body = {
    userIdx,
  };

  // function _navigate() {
  //   props.navigation.navigate("ProfileScreen");
  // }

  // jwt 값 가져오기
  const getJwt = async () => {
    try {
      let value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        setJwt(value);
      } else {
        console.log("no value!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // jwt토큰으로 유저 idx 불러오기
  const getUserIdx = async (jwt) => {
    await axios
      .get(`${BaseURL}users/userIdx`, {
        headers: {
          "X-ACCESS-TOKEN": jwt,
        },
      })
      .then((response) => {
        const userIdx = response.data.result.userIdx;
        setUserIdx(userIdx);
      })
      .catch((err) => console.log(err));
  };

  // 로그 아웃 api
  const Logout = async () => {
    await axios
      .post(`${BaseURL}users/logout`, body, headers)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };

  // 로그아웃 알림
  const _checkLogout = () => {
    Alert.alert(
      "주의",
      "로그아웃 하시겠습니까?",
      [
        { text: "확인", onPress: _logout.bind(this) },
        { text: "취소", onPress: () => null },
      ],
      { cancelable: true }
    );
  };

  // 로그아웃
  const _logout = async () => {
    try {
      // console.log(userIdx);
      // console.log(jwt);
      Logout(userIdx, jwt);
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.log("AsyncStorage error: " + error.message);
    }

    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: "LoginScreen" })],
    });

    props.navigation.dispatch(resetAction);
  };

  useEffect(() => {
    getJwt();
    getUserIdx(jwt);
  }, [jwt]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.wrapButton}
        onPress={_checkLogout.bind(this)}
      >
        <Text>🔓 로그아웃</Text>
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
