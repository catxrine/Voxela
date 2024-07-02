<script setup>
import { onMounted, watch, reactive } from "vue";
import { useRoute } from "vue-router";

import { addUser, removeUser } from "../helpers/actions/userActions";
import { publicPost } from "../helpers/actions/postActions";
import { getCurrentUserId } from "../helpers/utils";
import { useUserStore } from "../store/userStore";

import PostInput from "../components/PostInput.vue";
import MiniCard from "../components/MiniCard.vue";
import NoPosts from "../components/NoPosts.vue";
import Post from "../components/Post.vue";
import Tag from "../components/Tag.vue";

const store = useUserStore();
const route = useRoute();

const state = reactive({
  userId: route.params.id || getCurrentUserId(),
  postData: null,
});

const followed = () => {
  return store.profile?.followed?.find((el) => el.follows === state.userId);
};

onMounted(() => {
  store.setViewedProfile(state.userId);
});
watch(
  () => route.params.id,
  (newId) => {
    state.userId = newId || getCurrentUserId();
    store.setViewedProfile(state.userId);
  }
);
</script>

<template>
  <div :class="`grid theme-${store.viewedProfile?.accent}`">
    <div
      class="flex md:flex-row flex-col md:justify-normal md:items-start justify-center items-center rounded-lg border border-gray-200/80 bg-white py-6 md:px-6 h-full"
    >
      <img
        class="flex mb-2 md:m-0 md:h-[130px] md:w-[130px] h-[100px] w-[100px] bg-cover bg-center rounded"
        src="/finn.jpeg"
      />

      <div
        class="flex justify-center md:w-full md:ml-6 items-center md:justify-normal md:items-start flex-col"
      >
        <div class="flex h-8 gap-2 md:justify-between md:w-full flex-row">
          <h2 class="text-lg font-semibold">
            @{{ store.viewedProfile?.username }}
          </h2>
          <div class="w-100 flex flex-grow flex-col items-end justify-start">
            <div class="flex flex-row space-x-3">
              <span
                @click="
                  () =>
                    addUser(state.userId).then(() => {
                      store.setViewedProfile(state.userId);
                      store.setProfile(store.profile._id);
                    })
                "
                v-if="!followed() && state.userId !== getCurrentUserId()"
                class="material-symbols-outlined p-2 not-followed"
              >
                person_add
              </span>
              <span
                @click="
                  () =>
                    removeUser(userId).then(() => {
                      store.setViewedProfile(state.userId);
                      store.setProfile(profile._id);
                    })
                "
                v-else-if="followed() && state.userId !== getCurrentUserId()"
                class="material-symbols-outlined followed"
              >
                how_to_reg
              </span>
            </div>
          </div>
        </div>

        <div class="my-2 flex flex-row space-x-2">
          <div v-for="value in store.viewedProfile?.tags">
            <Tag :title="value" />
          </div>
        </div>
        <div class="md:mt-2 flex flex-row flex-wrap items-center space-x-5">
          <MiniCard
            title="Posts"
            :data="store.viewedProfile?.posts?.length"
            icon="style"
          />
          <MiniCard
            title="Followers"
            :data="store.viewedProfile?.followers?.length"
            icon="group"
          />
          <MiniCard
            title="Followed"
            :data="store.viewedProfile?.followed?.length"
            icon="person_check"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col w-full justify-center md:m-auto">
    <div v-if="state.userId === getCurrentUserId()">
      <PostInput
        :action="
          async () =>
            await publicPost({
              description: state.postData.trim(),
            }).then(() => {
              store.setViewedProfile(state.userId);

              state.postData = null;
            })
        "
      >
        <input
          v-model="state.postData"
          class="input-secondary"
          placeholder="Share your thoughts"
        />
      </PostInput>
    </div>

    <div class="flex" v-if="store.viewedProfile?.posts.length < 1">
      <NoPosts />
    </div>
    <div v-else class="mt-14">
      <div
        :class="`flex justify-center theme-${store.viewedProfile?.accent}`"
        v-for="value in store.viewedProfile?.posts"
        :key="value._id"
      >
        <Post :post="value" />
      </div>
    </div>
  </div>
</template>
