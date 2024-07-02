import { fetchData } from "../fetchData";
import { getCurrentUserId } from "../utils";

export const getAllPosts = () => {
  return fetchData({
    url: `/post/all`,
    method: "GET",
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

export const deletePost = (id) => {
  return fetchData({
    url: `/post/${id}`,
    method: "DELETE",
    auth: localStorage.getItem("jwt"),
  });
};
export const publicPost = (data) => {
  return fetchData({
    url: "/post",
    method: "POST",
    auth: localStorage.getItem("jwt"),
    body: {
      description: data.description,
    },
  });
};

export const likePost = (postId) => {
  return fetchData({
    url: `/post/likes/${postId}`,
    method: "PATCH",
    auth: localStorage.getItem("jwt"),
    body: { id: getCurrentUserId() },
  });
};
