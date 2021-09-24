import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import axios from "axios";
import { ImageBackground, TouchableOpacity, AsyncStorage } from "react-native";
import styled from "styled-components/native";
import { postUserLocation } from "../api";

const Container = styled.View`
  width: 100%;
  height: 100%;
`;

const MetaContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 48px;
  padding: 5px 0;
  letter-spacing: 6px;
`;

const OffText = styled.Text`
  align-self: center;
  text-align: center;
  font-size: 24px;
`;

const PosView = styled.View`
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const PosText = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  color: #424242;
`;

const AlertContainer = styled.View`
  width: 50%;
  align-self: center;
  background-color: black;
  border-radius: 16px;
`;

const AlertText = styled.Text`
  font-size: 24px;
  align-self: center;
  color: white;
`;

export default function App() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [on, setOn] = useState(false);
  const [jwt, setJwt] = useState("");
  const [userIdx, setUserIdx] = useState("");
  const [restrictStatus, setRestrictStatus] = useState("Y");

  const BaseURL = "https://www.gpsdemo.shop/";
  const STORAGE_KEY = "id_token";

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
        // console.log(response.data.result);
        const userIdx = response.data.result.userIdx;
        setUserIdx(userIdx);
      })
      .catch((err) => console.log(err));
  };

  // 제한 범위 내에 있는지 밖에 있는지 확인
  const getRestrict = async (userIdx) => {
    await axios
      .get(`${BaseURL}users/info`, {
        params: {
          userIdx,
        },
      })
      .then((response) => {
        console.log(response.data.result);
        const rStatus = response.data.result.restrictStatus;
        setRestrictStatus(rStatus);
      })
      .catch((err) => console.log(err));
  };

  // 위치 정보
  const getLocation = async () => {
    await Location.requestForegroundPermissionsAsync();

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();

    setLocation({
      latitude,
      longitude,
    });
    getRestrict(userIdx);
    postUserLocation(userIdx, latitude, longitude);
    // getUserLocation(userIdx);
  };

  useEffect(() => {
    if (on) {
      getLocation();
      const timer = setInterval(() => getLocation(), 100000);
      return () => clearInterval(timer);
    }
  }, [on]);

  useEffect(() => {
    getJwt();
    getUserIdx(jwt);
  }, [jwt]);

  return (
    <Container>
      <ImageBackground
        source={require("../assets/background.jpg")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {on ? (
          <MetaContainer style={{ flex: 1 }}>
            <PosView>
              <PosText>현재위치</PosText>
              <PosText>위도: {location.latitude}</PosText>
              <PosText>경도: {location.longitude}</PosText>
            </PosView>
            <AlertContainer>
              {restrictStatus === "Y" ? (
                <AlertText>범위 안입니다.</AlertText>
              ) : (
                <AlertText style={{ color: "red" }}>범위 밖입니다.</AlertText>
              )}
            </AlertContainer>
            {location.latitude !== null ? console.log(location) : null}
            <TouchableOpacity
              style={{
                width: "80%",
                alignItems: "center",
                alignSelf: "center",
                backgroundColor: "black",
                borderRadius: 32,
              }}
              onPress={() => setOn(false)}
            >
              <BtnText>OFF</BtnText>
            </TouchableOpacity>
          </MetaContainer>
        ) : (
          <MetaContainer style={{ flex: 1 }}>
            <OffText>위치 정보 확인을 위해 GPS를 켜주세요!</OffText>
            <TouchableOpacity
              style={{
                width: "80%",
                alignItems: "center",
                alignSelf: "center",
                backgroundColor: "black",
                borderRadius: 32,
              }}
              onPress={() => setOn(true)}
            >
              <BtnText>ON</BtnText>
            </TouchableOpacity>
          </MetaContainer>
        )}
      </ImageBackground>
    </Container>
  );
}
