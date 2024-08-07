import { fetchData } from "../fetchData";
import { getCurrentUserId } from "./../utils";

export const getCurrentUserData = () => {
  return fetchData({
    url: `/user/${getCurrentUserId()}`,
    method: "GET",
    auth: localStorage.getItem("jwt"),
  });
};

export const editProfile = (data) => {
  return fetchData({
    url: `/user/${getCurrentUserId()}`,
    method: "PATCH",
    auth: localStorage.getItem("jwt"),
    body: {
      username: data.username,
      email: data.email,
      tags: data.tags,
      accent: data.accent,
    },
  });
};

export const addUser = (id) => {
  console.log(id);
  return fetchData({
    url: "/follow/add",
    method: "POST",
    auth: localStorage.getItem("jwt"),
    body: {
      followed: id,
    },
  });
};
export const removeUser = (id) => {
  return fetchData({
    url: "/follow/remove",
    method: "DELETE",
    auth: localStorage.getItem("jwt"),
    body: {
      id,
    },
  });
};

export const searchForUsers = (param) => {
  return fetchData({
    url: "/user/all/" + param || "",
    method: "GET",
    auth: localStorage.getItem("jwt"),
  });
};
