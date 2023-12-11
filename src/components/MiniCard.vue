<script>
export default {
  props: ["title", "path", "icon", "data"],
};
</script>
<template>
  <a
    :href="path"
    class="flex h-20 w-40 flex-col items-center justify-center rounded-md border border-dashed transition-colors duration-100 ease-in-out border-gray-400/80"
  >
    <div class="flex flex-row gap-2 items-center justify-center text-gray-600">
      <span class="material-symbols-outlined">{{ icon }} </span>

      <span class="font-bold"> {{ data }} </span>
    </div>

    <div class="mt-2 text-sm text-gray-400">{{ title }}</div>
  </a>
</template>
