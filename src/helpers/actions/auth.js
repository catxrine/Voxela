import { fetchData } from "../fetchData";

export const logIn = (loginCredentials) => {
  fetchData({
    url: "/auth/login",
    method: "POST",
    body: loginCredentials,
  }).then((data) => {
    localStorage.setItem("jwt", data.jwt);
    window.location.pathname = "/profile";
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

export const publicPost = (data) => {
  fetchData({
    url: "/post",
    auth: localStorage.getItem("jwt"),
    method: "POST",
    body: { description: data.description },
  });
};

export const logOut = () => {
  localStorage.removeItem("jwt");
};
