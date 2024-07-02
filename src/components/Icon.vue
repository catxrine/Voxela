<script setup>
defineProps({ icon: String, actions: Function });
</script>

<template>
  <span @click="actions" :class="`material-symbols-outlined cursor-pointer`">
    {{ icon }}
  </span>
</template>
