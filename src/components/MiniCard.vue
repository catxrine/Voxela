<script setup>
defineProps({ title: String, icon: String, data: Number });
</script>

<template>
  <a
    class="flex md:h-20 h-20 w-24 md:w-40 md:p-0 p-2 flex-col items-center justify-center rounded-md border border-dashed transition-colors duration-100 ease-in-out border-gray-400/80"
  >
    <div class="flex flex-row gap-2 items-center justify-center text-gray-600">
      <span class="material-symbols-outlined">{{ icon }} </span>

      <span class="font-bold"> {{ data }} </span>
    </div>

    <div class="mt-2 text-sm text-gray-400">{{ title }}</div>
  </a>
</template>
