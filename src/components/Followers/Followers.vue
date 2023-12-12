<script>
import Follower from "./Follower.vue";
import { BASE_URL } from "../../constants/constants";
import { getCurrentUserId } from "../../helpers/utils";
import Icon from "../Icon.vue";
export default {
  data() {
    return {
      followers: [],
      followed: [],
      searchValue: "",
    };
  },

  components: { Follower, Icon },

  methods: {
    isFollowingBack(id) {
      return this.followed.some((el) => el.follows === id);
    },
    // searchFnc() {
    //   const searchFor = this.searchValue.toLowerCase;
    //   this.followers.map((el) => {
    //     const user = el.username.toLowerCase();
    //     if (!user.includes(searchFor)) {
    //       this.followers = this.followers.filter(
    //         (v) => v.followedBy === el.followedBy
    //       );
    //     }
    //   });
    // },
  },
  mounted() {
    fetch(`${BASE_URL}/user/` + getCurrentUserId(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        jwt: localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.followers = data.followers;
        this.followed = data.followed;
      });
  },
  watch: {
    $route(to, from) {
      fetch(`${BASE_URL}/user/` + getCurrentUserId(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          jwt: localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.followers = data.followers;
          this.followed = data.followed;
        });
    },
  },
};
</script>
<template>
  <div>
    <h2 class="font-semibold text-[18px] flex justify-center m-2">Followers</h2>
    <!-- <input
      type="text"
      @keydown="searchFnc()"
      v-model="searchValue"
      placeholder="search"
      class="input-primary"
    /> -->
    <div v-if="followers?.length > 0" v-for="(value, name) in followers">
      <Follower
        :followsBack="isFollowingBack(value.followedBy)"
        :to="value.followedBy"
        :username="value.username"
      />
    </div>
    <div v-else>
      <h2 class="font-semibold text-[16px] flex justify-center m-2">
        No followers yet..🔭
      </h2>
    </div>
  </div>
</template>
