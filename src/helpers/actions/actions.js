import { fetchData } from "../fetchData";
import { getCurrentUserId } from "../utils";

export const publicPost = (data) => {
  return fetchData({
    url: "/post",
    method: "POST",
    auth: localStorage.getItem("jwt"),
    body: {
      description: data.description,
      username: data.username,
    },
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

export const deletePost = (id) => {
  return fetchData({
    url: `/post/${id}`,
    method: "DELETE",
    auth: localStorage.getItem("jwt"),
  });
};
export const editPost = (id, description) => {
  fetchData({
    url: `/post/${id}`,
    method: "PATCH",
    auth: localStorage.getItem("jwt"),
    body: { description: description },
  });
};

export const editProfile = (id, username, email, tag) => {
  fetchData({
    url: `/user/${id}`,
    method: "PATCH",
    auth: localStorage.getItem("jwt"),
    body: { username: username, email: email, tag: tag },
  });
};

export const getAllPosts = () => {
  fetchData({
    url: `/post/all`,
    method: "GET",
    auth: localStorage.getItem("jwt"),
  });
};
export const deleteTag = (title) => {
  fetchData({
    url: `/tags/delete`,
    method: "DELETE",
    auth: localStorage.getItem("jwt"),
    body: { title: title },
  });
};
