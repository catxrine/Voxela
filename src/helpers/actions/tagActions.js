import { fetchData } from "../fetchData";

export const deleteTag = (title) => {
  return fetchData({
    url: `/tags/delete`,
    method: "DELETE",
    auth: localStorage.getItem("jwt"),
    body: { title: title },
  });
};
