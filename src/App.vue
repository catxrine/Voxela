<script setup>
import { themes } from "./main";
</script>
<template>
  <div :class="`theme-${themes.accent}`">
    <router-view />
  </div>
</template>
