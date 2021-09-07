import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { ImageBackground, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { postUserLocation, getUserLocation } from "../api";

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
    // console.log(latitude, longitude);
    postUserLocation(4, latitude, longitude);
    getUserLocation(4);
  };

  useEffect(() => {
    if (on) {
      getLocation();
      const timer = setInterval(() => getLocation(), 100000);
      return () => clearInterval(timer);
    }
  }, [on]);

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
              <AlertText>범위 안입니다.</AlertText>
            </AlertContainer>
            {location.latitude !== null ? console.log(location) : null}
            <TouchableOpacity
              style={{
                width: "80%",
                alignItems: "center",
                alignSelf: "center",
                backgroundColor: "black",
                borderRadius: "32px",
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
                borderRadius: "32px",
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
