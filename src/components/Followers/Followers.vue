<script>
import { addUser, removeUser } from "../../helpers/actions/userActions";
import { mapState, mapActions } from "pinia";
import { useUserStore } from "../../store/userStore";
import { getCurrentUserId } from "../../helpers/utils";
import Follower from "./Follower.vue";
import Icon from "../Icon.vue";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(useUserStore, ["profile", "viewedProfile"]),
  },
  components: { Follower, Icon },

  methods: {
    isFollowingBack(id) {
      return this.profile.followed.some((el) => el.follows === id);
    },
    getCurrentUserId,
    addUser,
    removeUser,
    ...mapActions(useUserStore, ["setProfile", "setViewedProfile"]),
  },
  mounted() {
    this.setProfile(this.getCurrentUserId());
  },
  watch: {
    $route(to, from) {
      this.setProfile(this.getCurrentUserId());
    },
  },
};
</script>
<template>
  <div>
    <h2 class="font-semibold text-[18px] flex justify-center m-2">Followers</h2>
    <div
      v-if="profile?.followers?.length > 0"
      v-for="value in profile?.followers"
    >
      <Follower
        :add="
          () => {
            addUser(value.followedBy).then(() => {
              setProfile(getCurrentUserId());
              setViewedProfile(viewedProfile._id);
            });
          }
        "
        :remove="
          () =>
            removeUser(value.followedBy).then(() => {
              setProfile(getCurrentUserId());
              setViewedProfile(viewedProfile._id);
            })
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
