<script setup>
import { ref, watch } from "vue";
import { searchForUsers } from "../helpers/actions/userActions";

const inputValue = ref("");
const showDropdown = ref(false);
const users = ref([]);

watch(inputValue, (val) => {
  if (val.length > 0) {
    searchForUsers(val).then((res) => {
      users.value = res;
      showDropdown.value = true;
    });
  } else {
    showDropdown.value = false;
  }
});
</script>
<template>
  <div class="relative">
    <input
      v-model="inputValue"
      class="input-tertiary"
      placeholder="Find more users"
    />
    <div
      v-if="showDropdown"
      class="bg-white absolute shadow-md w-full rounded flex flex-col"
    >
      <router-link
        class="p-4 flex flex-row gap-2 hover:bg-slate-50"
        v-for="value in users"
        :key="value._id"
        :to="`/profile/${value._id}`"
      >
        <img
          class="flex mb-2 md:m-0 md:h-9 md:w-9 h-8 w-8 bg-cover bg-center rounded"
          src="/finn.jpeg"
        />
        <p class="flex items-center">{{ value.username }}</p>
      </router-link>
    </div>
  </div>
</template>
