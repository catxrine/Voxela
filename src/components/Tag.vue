<script setup>
defineProps({ title: String });
</script>
<template>
  <div class="tag-primary">
    <div class="text-xs">{{ title }}</div>
  </div>
</template>
