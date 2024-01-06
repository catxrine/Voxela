import { fetchData } from "../fetchData";

export const logIn = (loginCredentials) => {
  fetchData({
    url: "/auth/login",
    method: "POST",
    body: loginCredentials,
  }).then((data) => {
    localStorage.setItem("jwt", data.jwt);
    window.location.pathname = "/profile";
    console.log(data);
  });
};

export const registerUser = (loginCredentials) => {
  fetchData({
    url: "/auth/register",
    method: "POST",
    body: loginCredentials,
  }).then((data) => {
    localStorage.setItem("jwt", data.jwt);
    window.location.pathname = "/profile";
  });
};

export const logOut = () => {
  localStorage.removeItem("jwt");
};
