<script setup>
defineProps({ action: Function });
</script>

<template>
  <div class="flex flex-row justify-center mt-10 mx-4">
    <div
      class="flex w-[400px] items-center justify-center shadow-sm bg-gray-100 p-4 rounded-l-md"
    >
      <span class="text-green-600 font-semibold">&gt;</span>
      <slot></slot>
    </div>
    <button
      @click="action"
      class="rounded-r-md py-2 text-gray-100 hover:text-gray-700 font-semibold px-2 transition-all duration-300 ease-in-out bg-gray-600 hover:bg-gray-300"
    >
      POST
    </button>
  </div>
</template>
