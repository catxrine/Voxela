import { defineStore } from "pinia";
import { fetchData } from "../helpers/fetchData";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      profile: null,
    };
  },
  actions: {
    setProfile(id) {
      fetchData({
        url: `/user/${id}`,
        method: "GET",
        auth: localStorage.getItem("jwt"),
      }).then((data) => {
        this.profile = data;
      });
    },
  },
});
