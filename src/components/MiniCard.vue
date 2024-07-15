<script setup>
defineProps({ title: String, icon: String, data: Number });
</script>

<template>
  <a
    :class="`flex h-20 w-24 md:p-0 p-2 flex-col items-center justify-center shadow-sm rounded-md border`"
  >
    <div class="flex flex-row gap-2 items-center justify-center text-gray-600">
      <span class="material-symbols-outlined">{{ icon }} </span>
      <span class="font-bold"> {{ data }} </span>
    </div>
    <div class="mt-2 text-sm text-gray-400">{{ title }}</div>
  </a>
</template>
