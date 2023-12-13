<script>
import { mapState, mapActions } from "pinia";
import { useUserStore } from "../store/userStore";
import { getCurrentUserId } from "../helpers/utils";
import PostInput from "../components/PostInput.vue";
import { fetchData } from "../helpers/fetchData";
import { addUser, removeUser } from "../helpers/actions/userActions";
import { publicPost } from "../helpers/actions/postActions";

import NoPosts from "../components/NoPosts.vue";
import Post from "../components/Post.vue";
import MiniCard from "../components/MiniCard.vue";
import Tag from "../components/Tag.vue";
import Icon from "../components/Icon.vue";

export default {
  components: { MiniCard, Tag, Icon, Post, PostInput, NoPosts },

  computed: {
    ...mapState(useUserStore, ["profile"]),
  },

  data() {
    return {
      userId: this.$route.params.id || getCurrentUserId(),
      postData: null,
      currentUser: null,
    };
  },

  methods: {
    getCurrentUserId,
    removeUser,
    addUser,
    publicPost,
    getCurrentUserData() {
      fetchData({
        url: `/user/${this.getCurrentUserId()}`,
        method: "GET",
        auth: localStorage.getItem("jwt"),
      }).then((data) => (this.currentUser = data));
    },
    followed() {
      return this.currentUser?.followed?.find(
        (el) => el.follows === this.userId
      );
    },
    ...mapActions(useUserStore, ["setProfile"]),
  },

  mounted() {
    this.setProfile(this.userId);
    this.getCurrentUserData();
  },

  watch: {
    $route(to, from) {
      this.userId = this.$route.params.id || getCurrentUserId();
      this.setProfile(this.userId);
    },
  },
};
</script>
<template>
  <div class="grid">
    <div
      class="flex flex-row rounded-lg border border-gray-200/80 bg-white p-6 h-full"
    >
      <div class="relative">
        <img
          class="inline-block h-48 w-48 bg-cover bg-center"
          src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
        />
      </div>

      <div class="flex flex-col px-6">
        <div class="flex h-8 flex-row">
          <h2 class="text-lg font-semibold">@{{ this.profile?.username }}</h2>
        </div>

        <div class="my-2 flex flex-row space-x-2">
          <div v-for="value in profile?.tags">
            <Tag :title="value" />
          </div>
        </div>

        <div class="mt-2 flex flex-row items-center space-x-5">
          <MiniCard
            title="Posts"
            :data="this.profile?.posts?.length"
            icon="style"
          />
          <MiniCard
            title="Followers"
            :data="this.profile?.followers?.length"
            icon="group"
          />
          <MiniCard
            title="Followed"
            :data="this.profile?.followed?.length"
            icon="person_check"
          />
        </div>
      </div>

      <div class="w-100 flex flex-grow flex-col items-end justify-start">
        <div class="flex flex-row space-x-3">
          <span
            @click="
              () =>
                addUser(userId).then(() => {
                  getCurrentUserData();
                  setProfile(userId);
                })
            "
            v-if="!followed() && this.userId !== getCurrentUserId()"
            class="material-symbols-outlined not-followed"
          >
            person_add
          </span>
          <span
            @click="
              () =>
                removeUser(userId).then(() => {
                  getCurrentUserData();
                  setProfile(userId);
                })
            "
            v-else-if="followed() && this.userId !== getCurrentUserId()"
            class="material-symbols-outlined followed"
          >
            how_to_reg
          </span>
          <Icon
            icon="more_vert"
            :style="`flex rounded-md bg-gray-100 py-2 px-1 text-gray-500 transition-all duration-150 ease-in-out hover:bg-gray-200`"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col w-full justify-center m-auto">
    <div v-if="this.userId === getCurrentUserId()">
      <PostInput
        :action="
          () =>
            publicPost({
              description: postData.trim(),
              username: profile?.username,
            }).then(() => setProfile(userId))
        "
      >
        <input
          v-model="postData"
          class="input-secondary"
          placeholder="Share your thoughs"
        />
      </PostInput>
    </div>

    <div class="flex" v-if="profile?.posts.length < 1"><NoPosts /></div>
    <div v-else class="mt-14">
      <div v-for="value in profile?.posts" :key="value._id">
        <Post
          :username="value.username"
          :author="value.author"
          :description="value.description"
          :date="value.createdAt"
          :_id="value._id"
        />
      </div>
    </div>
  </div>
</template>
