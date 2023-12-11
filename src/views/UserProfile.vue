<script>
import { mapState, mapActions } from "pinia";
import { useUserStore } from "../store/userStore";
import { getCurrentUserId } from "../helpers/utils";

import { publicPost, addUser, removeUser } from "../helpers/actions/actions";

import Post from "../components/Post.vue";
import MiniCard from "../components/MiniCard.vue";
import Tag from "../components/Tag.vue";
import Icon from "../components/Icon.vue";

export default {
  computed: {
    ...mapState(useUserStore, ["profile"]),
  },

  data() {
    return {
      userId: this.$route.params.id || getCurrentUserId(),
      postData: null,
    };
  },

  methods: {
    async checkIfFollowed() {
      return !!this.profile?.followed?.find((el) => el.follows === this.userId);
    },
    getCurrentUserId,
    removeUser,
    addUser,

    ...mapActions(useUserStore, ["setProfile"]),
  },

  mounted() {
    this.setProfile(this.userId);
  },

  components: { MiniCard, Tag, Icon, Post },

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
      class="flex flex-row rounded-lg border border-gray-200/80 bg-white p-6"
    >
      <div class="relative">
        <img
          class="w-40 h-40 object-cover"
          src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
          alt="User"
        />
      </div>

      <div class="flex flex-col px-6">
        <div class="flex h-8 flex-row">
          <h2 class="text-lg font-semibold">@{{ this.profile?.username }}</h2>
        </div>

        <div class="my-2 flex flex-row space-x-2">
          <Tag title="Science" />
          <Tag title="CS" />
          <Tag title="Anon" />
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
            @click="() => addUser(userId)"
            v-if="!checkIfFollowed() && this.userId !== getCurrentUserId()"
            class="material-symbols-outlined flex rounded-md cursor-pointer bg-gray-100 py-2 text-gray-500 px-2 transition-all duration-150 ease-in-out hover:bg-gray-200"
          >
            person_add
          </span>

          <span
            @click="() => removeUser(userId)"
            v-else-if="checkIfFollowed() && this.userId !== getCurrentUserId()"
            class="material-symbols-outlined flex bg-green-100 text-green-700 rounded-md cursor-pointer py-2 px-2 transition-all duration-150 ease-in-out hover:bg-gray-200"
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
    <div
      v-if="this.userId === getCurrentUserId()"
      class="flex flex-row justify-center mt-10"
    >
      <div
        class="flex w-[30vw] items-center justify-center shadow-sm bg-gray-100 p-4 rounded-l-md"
      >
        <span class="text-green-600 font-semibold">&gt;</span>
        <input
          v-model="postData"
          class="bg-gray-100 p-0.5 placeholder:text-gray-500 outline-none ml-2 w-full"
          placeholder="Share your thoughs"
        />
      </div>
      <button
        @click="() => publicPost({ description: postData.trim() })"
        class="rounded-r-md py-2 text-gray-100 hover:text-gray-700 font-semibold px-2 transition-all duration-300 ease-in-out bg-gray-600 hover:bg-gray-300"
      >
        POST
      </button>
    </div>
    <div class="mt-10 px-5 pt-5 h-[52vh] overflow-y-auto">
      <div v-for="(value, name) in profile?.posts">
        <Post
          :author="this.profile?.username"
          :description="value.description"
          :date="value.createdAt"
          :_id="value._id"
        />
      </div>
    </div>
  </div>
</template>
