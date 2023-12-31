import { fetchData } from "../fetchData";
import { getCurrentUserId } from "./../utils";

export const getCurrentUserData = () => {
  return fetchData({
    url: `/user/${getCurrentUserId()}`,
    method: "GET",
    auth: localStorage.getItem("jwt"),
  });
};

export const editProfile = (username, email, tag) => {
  return fetchData({
    url: `/user/${getCurrentUserId()}`,
    method: "PATCH",
    auth: localStorage.getItem("jwt"),
    body: { username: username, email: email, tag: tag },
  });
};

export const addUser = (id) => {
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
