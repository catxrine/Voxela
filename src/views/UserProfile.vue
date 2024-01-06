<script>
import { mapState, mapActions } from "pinia";
import { useUserStore } from "../store/userStore";
import { getCurrentUserId } from "../helpers/utils";
import PostInput from "../components/PostInput.vue";
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
    ...mapState(useUserStore, ["viewedProfile", "profile"]),
  },

  data() {
    return {
      userId: this.$route.params.id || getCurrentUserId(),
      postData: null,
    };
  },

  methods: {
    getCurrentUserId,
    removeUser,
    addUser,
    publicPost,

    followed() {
      return this.profile?.followed?.find((el) => el.follows === this.userId);
    },
    ...mapActions(useUserStore, ["setViewedProfile", "setProfile"]),
  },

  mounted() {
    this.setViewedProfile(this.userId);
  },

  watch: {
    $route(to, from) {
      this.userId = this.$route.params.id || getCurrentUserId();
      this.setViewedProfile(this.userId);
    },
  },
};
</script>
<template>
  <div class="grid">
    <div
      class="flex md:flex-row flex-col md:justify-normal md:items-start justify-center items-center rounded-lg border border-gray-200/80 bg-white py-6 md:px-6 h-full"
    >
      <img
        class="flex mb-2 md:m-0 md:h-[130px] md:w-[130px] h-[100px] w-[100px] bg-cover bg-center"
        src="/astronaut (2).png"
      />

      <div
        class="flex justify-center md:w-full md:ml-6 items-center md:justify-normal md:items-start flex-col"
      >
        <div class="flex h-8 gap-2 md:justify-between md:w-full flex-row">
          <h2 class="text-lg font-semibold">
            @{{ this.viewedProfile?.username }}
          </h2>
          <div class="w-100 flex flex-grow flex-col items-end justify-start">
            <div class="flex flex-row space-x-3">
              <span
                @click="
                  () =>
                    addUser(userId).then(() => {
                      setViewedProfile(userId);
                      setProfile(profile._id);
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
                      setViewedProfile(userId);
                      setProfile(profile._id);
                    })
                "
                v-else-if="followed() && this.userId !== getCurrentUserId()"
                class="material-symbols-outlined followed"
              >
                how_to_reg
              </span>
            </div>
          </div>
        </div>

        <div class="my-2 flex flex-row space-x-2">
          <div v-for="value in viewedProfile?.tags">
            <Tag :title="value" />
          </div>
        </div>

        <div class="md:mt-2 flex flex-row flex-wrap items-center space-x-5">
          <MiniCard
            title="Posts"
            :data="this.viewedProfile?.posts?.length"
            icon="style"
          />
          <MiniCard
            title="Followers"
            :data="this.viewedProfile?.followers?.length"
            icon="group"
          />
          <MiniCard
            title="Followed"
            :data="this.viewedProfile?.followed?.length"
            icon="person_check"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col w-full justify-center md:m-auto">
    <div v-if="this.userId === getCurrentUserId()">
      <PostInput
        :action="
          async () =>
            await publicPost({
              description: postData.trim(),
              username: viewedProfile?.username,
            }).then(() => {
              setViewedProfile(userId);
            })
        "
      >
        <input
          v-model="postData"
          class="input-secondary"
          placeholder="Share your thoughs"
        />
      </PostInput>
    </div>

    <div class="flex" v-if="viewedProfile?.posts.length < 1"><NoPosts /></div>
    <div v-else class="mt-14">
      <div
        class="flex justify-center"
        v-for="value in viewedProfile?.posts"
        :key="value._id"
      >
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
