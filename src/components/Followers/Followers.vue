<script setup>
import { onMounted } from "vue";

import { useUserStore } from "../../store/userStore";
import { getCurrentUserId } from "../../helpers/utils";
import { addUser, removeUser } from "../../helpers/actions/userActions";

import Follower from "./Follower.vue";
import UsersSearch from "../UsersSearch.vue";

const store = useUserStore();

const isFollowingBack = (id) => {
  return store.profile.followed.some((el) => el.follows === id);
};

onMounted(() => store.setProfile(getCurrentUserId()));
</script>

<template>
  <div>
    <div class="mb-3 px-4">
      <h2 class="font-semibold text-[18px] flex justify-center m-2">
        Followers
      </h2>
      <UsersSearch />
    </div>
    <div
      v-if="store.profile?.followers?.length > 0"
      v-for="value in store.profile?.followers"
    >
      <Follower
        :add="
          () => {
            addUser(value.followedBy).then(() => {
              store.setProfile(getCurrentUserId());
              store.setViewedProfile(store.viewedProfile._id);
            });
          }
        "
        :remove="
          () =>
            removeUser(value.followedBy).then(() => {
              store.setProfile(getCurrentUserId());
              store.setViewedProfile(store.viewedProfile._id);
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
