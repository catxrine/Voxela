<script>
import { addUser, removeUser } from "../../helpers/actions/userActions";
import { getCurrentUserId } from "../../helpers/utils";
import { fetchData } from "../../helpers/fetchData";
import Follower from "./Follower.vue";
import Icon from "../Icon.vue";

export default {
  data() {
    return {
      followers: [],
      followed: [],
    };
  },

  components: { Follower, Icon },

  methods: {
    isFollowingBack(id) {
      return this.followed.some((el) => el.follows === id);
    },
    getCurrentUserId,
    getCurrentUserData() {
      fetchData({
        url: `/user/${this.getCurrentUserId()}`,
        method: "GET",
        auth: localStorage.getItem("jwt"),
      }).then((data) => {
        this.followers = data.followers;
        this.followed = data.followed;
      });
    },
    addUser,
    removeUser,
  },
  mounted() {
    this.getCurrentUserData();
  },
  watch: {
    $route(to, from) {
      this.getCurrentUserData();
    },
  },
};
</script>
<template>
  <div>
    <h2 class="font-semibold text-[18px] flex justify-center m-2">Followers</h2>
    <div v-if="followers?.length > 0" v-for="(value, name) in followers">
      <Follower
        :add="() => addUser(value.followedBy).then(() => getCurrentUserData())"
        :remove="
          () => removeUser(value.followedBy).then(() => getCurrentUserData())
        "
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
