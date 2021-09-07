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

// 로그 아웃 api
export const Logout = async (idx) => {
  await axios
    .post(`${BaseURL}logout`, {
      userIdx: idx,
    })
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err));
};
