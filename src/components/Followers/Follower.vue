<script>
import { addUser, removeUser } from "../../helpers/actions/actions";
export default {
  props: ["username", "to", "followsBack"],

  methods: {
    addUser,
    removeUser,
  },
};
</script>
<template>
  <div
    class="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-200"
  >
    <router-link :to="`/profile/${to}`" class="flex items-center">
      <img
        class="rounded-full h-10 w-10 bg-gray-500"
        src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
      />
      <div class="ml-2 flex flex-col">
        <div class="leading-snug text-sm text-gray-900 font-bold">
          {{ username }}
        </div>
        <div class="leading-snug text-xs text-gray-600">@{{ username }}</div>
      </div>
    </router-link>
    <button v-if="followsBack" @click="removeUser(to)" class="tag-tertiary">
      Followed
    </button>
    <button v-else @click="addUser(to)" class="tag-secondary">Follow</button>
  </div>
</template>
