<script>
export default {
  props: ["username", "to", "followsBack", "remove", "add"],
};
</script>
<template>
  <div
    class="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-200"
  >
    <router-link :to="`/profile/${to}`" class="flex items-center">
      <img
        class="rounded-full p-1 h-11 w-11 bg-blue-950"
        src="/astronaut (2).png"
      />
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
