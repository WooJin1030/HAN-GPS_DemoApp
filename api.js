import axios from "axios";

const BaseURL = "https://www.gpsdemo.shop/";

// 회원 가입 api
export const postMember = async (id, passwd) => {
  await axios
    .post(`${BaseURL}users/sign-in`, {
      id,
      passwd,
    })
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err));
};

// 유저 정보 불러오기 api
export const getUserInfo = async (idx) => {
  await axios
    .get(`${BaseURL}users/info`, {
      params: {
        userIdx: idx,
      },
    })
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err));
};

// 위치 저장 api
export const postUserLocation = async (idx, lat, lon) => {
  await axios
    .post(`${BaseURL}locations`, {
      userIdx: idx,
      latitude: lat,
      longitude: lon,
    })
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err));
};

// 특정 유저에 대한 위치 기록
export const getUserLocation = async (idx) => {
  await axios
    .get(`${BaseURL}locations`, {
      params: {
        userIdx: idx,
      },
    })
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err));
};

// jwt 값으로 유저 인덱스 식별
export const getUserIdx = async (jwt) => {
  await axios
    .get(`${BaseURL}users/userIdx`, {
      headers: {
        "X-ACCESS-TOKEN": jwt,
      },
    })
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err));
};
