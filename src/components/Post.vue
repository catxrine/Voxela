<script setup>
import { ref, watch } from "vue";

import { deletePost, editPost, likePost } from "../helpers/actions/postActions";
import { useUserStore } from "../store/userStore";
import { getCurrentUserId } from "../helpers/utils";

import Icon from "./Icon.vue";

const props = defineProps({
  refetch: Function,
  post: Object,
});

const store = useUserStore();
const showEditInput = ref(false);
const newDescription = ref(props.post.description);
const postLikes = ref(props.post.likes);
watch(
  () => props.post.likes,
  (like) => {
    postLikes.value = like;
  }
);
</script>

<template>
  <div class="flex justify-center mx-6 max-w-[600px] relative w-full mb-8">
    <div
      class="relative w-full grid grid-cols-1 gap-4 p-4 border rounded-lg bg-white shadow-lg"
    >
      <div class="relative flex gap-4">
        <img
          src="/finn.jpeg"
          class="relative rounded-lg -top-8 p-1 -mb-4 bg-primary-300 border h-16 w-16"
        />
        <div class="flex flex-col w-full">
          <div class="flex flex-row justify-between">
            <router-link :to="`profile/${props.post.author._id}`">
              <p
                class="relative text-xl whitespace-nowrap truncate overflow-hidden"
              >
                {{ post.author.username }}
              </p>
            </router-link>
            <div
              v-if="post.author._id === getCurrentUserId()"
              class="inline-flex items-center rounded-md shadow-sm absolute right-0"
            >
              <button
                @click="showEditInput = !showEditInput"
                class="text-slate-800 hover:text-green-500 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
              >
                <Icon icon="edit_square" />
                <span class="hidden md:inline-block">Edit</span>
              </button>

              <button
                @click="
                  async () => {
                    await deletePost(post._id).then(() => {
                      store.setViewedProfile(getCurrentUserId());
                      refetch && refetch();
                    });
                    newDescription = null;
                  }
                "
                class="text-slate-800 hover:text-red-500 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
              >
                <Icon icon="delete_forever" />
                <span class="hidden md:inline-block">Delete</span>
              </button>
            </div>
          </div>
          <p class="text-gray-400 text-sm">
            {{ new Date(post.createdAt).toLocaleDateString() }},
            {{ new Date(post.createdAt).toLocaleTimeString() }}
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-4 w-full" v-if="!showEditInput">
        <p class="-mt-4 text-gray-500">
          {{ newDescription }}
        </p>
        <div
          @click="
            async () => {
              await likePost(post._id).then((res) => (postLikes = res));
            }
          "
          class="flex justify-end flex-row gap-1"
        >
          <Icon class="text-blue-600" icon="thumb_up" />
          <p>{{ postLikes.length }}</p>
        </div>
      </div>
      <input
        @keydown="
          (e) => {
            if (e.code === 'Enter') {
              editPost(post._id, newDescription);
              showEditInput = false;
            }
          }
        "
        v-else
        type="text"
        class="input-primary"
        v-model="newDescription"
      />
    </div>
  </div>
</template>
