const BASE_URL = "http://127.0.0.1:3000";
import axios from "axios";

function login(user) {
  return axios
    .post(`${BASE_URL}/login`, user)
    .then(res => {
      console.log(res.data.user);

      localStorage.User = JSON.stringify(res.data.user);

      return res.data.user;
    })
    .catch(err => {
      throw new Error("Login Failed");
    });
}

function register(user) {
  return axios
    .post(`${BASE_URL}/register`, user)
    .then(res => console.log(res.data))
    .catch(err => {
      throw new Error("Register Failed");
    });
}

function logout() {
  return axios
    .post(`${BASE_URL}/logout`)
    .then(res => {
      // localStorage.User = null;
      localStorage.removeItem("User");
      delete sessionStorage.user;
    })
    .catch(err => {
      throw new Error("Logout Failed");
    });
}

function updateUser(user, newUrl) {
  user.profileImg = newUrl;
  console.log('update user from service ',user);
  console.log('update newUrl from service ',newUrl);
  console.log('update user._id from service ',user._id);
  
  return axios
  
  
    .put(`${BASE_URL}/${user._id}`, user)
    .then(res => {})
    .catch(err => {
      throw new Error("image update failed!");
    });
}

export default {
  login,
  register,
  logout,
  updateUser
};
