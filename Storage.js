import React from "react";
import { AsyncStorage } from "react-native";
import { getUserIdx, Logout } from "./api";

const STORAGE_KEY = "id_token";

// storage 설정
export const _onValueChange = async (item, selectedValue) => {
  try {
    await AsyncStorage.setItem(item, selectedValue);
  } catch (error) {
    console.log("AsyncStorage error: " + error.message);
  }
};

// AsyncStorage에서 데이터 가져오기
export const _getFromStorage = async () => {
  try {
    let value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value !== null) {
      console.log(value);
    } else {
      console.log("no value!");
    }
  } catch (error) {
    console.log(error);
  }
};
