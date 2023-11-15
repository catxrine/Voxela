<script>
export default {
  props: ["label", "icon"],

  components: {},
};
</script>

<template>
  <div class="flex flex-col mb-5">
    <label class="mb-1 text-xs tracking-wide text-gray-600">{{ label }}</label>
    <div class="relative">
      <div
        class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
      >
        <i :class="icon" class="text-gray-800"></i>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
