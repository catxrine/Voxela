<script setup>
defineProps({
  label: String,
  icon: String,
  error: Object,
});
</script>

<template>
  <div class="flex flex-col mb-5">
    <label class="label">{{ label }}</label>
    <div class="relative">
      <div
        class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
      >
        <i :class="icon" class="text-gray-800"></i>
      </div>
      <slot></slot>
    </div>
    <div class="input-errors" v-for="error of error" :key="error.$uid">
      {{ error.$message }}
    </div>
  </div>
</template>
