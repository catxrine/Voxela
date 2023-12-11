import { fetchData } from "../fetchData";
import { getCurrentUserId } from "../utils";

export const publicPost = (data) => {
  fetchData({
    url: "/post",
    method: "POST",
    auth: localStorage.getItem("jwt"),
    body: {
      description: data.description,
    },
  }).then((data) => data.json());
};

export const addUser = (id) => {
  fetchData({
    url: "/follow/add",
    method: "POST",
    auth: localStorage.getItem("jwt"),
    body: {
      followed: id,
    },
  });
};
export const removeUser = (id) => {
  fetchData({
    url: "/follow/remove",
    method: "DELETE",
    auth: localStorage.getItem("jwt"),
    body: {
      id,
    },
  });
};

export const deletePost = (id) => {
  fetchData({
    url: `/post/${id}`,
    method: "DELETE",
    auth: localStorage.getItem("jwt"),
  });
};
