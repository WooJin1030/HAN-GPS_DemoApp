import axios from "axios";

const BaseURL = "https://www.gpsdemo.shop/";

export const postMember = async (id, passwd) => {
  await axios
    .post(`${BaseURL}users/sign-in`, {
      id,
      passwd,
    })
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err));
};

// export const Login = async (id, passwd) => {
//   await axios
//     .post(`${BaseURL}users/login`, {
//       id,
//       passwd,
//     })
//     .then((response) => console.log(response.data))
//     .catch((err) => console.log(err));
// };

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
