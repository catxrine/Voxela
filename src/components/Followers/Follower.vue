<script setup>
defineProps({
  username: String,
  to: String,
  followsBack: Boolean,
  remove: Function,
  add: Function,
});
</script>
<template>
  <div
    class="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-200"
  >
    <router-link :to="`/profile/${to}`" class="flex items-center">
      <img class="rounded-full p-1 h-11 w-11 bg-blue-950" src="/finn.jpeg" />
      <div class="ml-2 flex flex-col">
        <div class="leading-snug text-sm text-gray-900 font-bold">
          {{ username }}
        </div>
        <div class="leading-snug text-xs text-gray-600">@{{ username }}</div>
      </div>
    </router-link>
    <button v-if="followsBack" @click="remove" class="tag-tertiary">
      Followed
    </button>
    <button v-else @click="add" class="tag-secondary">Follow</button>
  </div>
</template>
