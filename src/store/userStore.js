import { defineStore } from "pinia";
import { getCurrentUserId } from "./../helpers/utils";
import { fetchData } from "../helpers/fetchData";
import { useRoute } from "vue-router";

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
        this.profile.posts = this.profile.posts.reverse();
      });
    },
  },
});
