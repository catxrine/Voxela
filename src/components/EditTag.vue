<script setup>
import Icon from "./Icon.vue";
import { deleteTag } from "../helpers/actions/tagActions";

defineProps({
  icon: String,
});
</script>
<template>
  <div class="tag-secondary flex flex-row gap-2 text-center justify-center">
    <Icon :actions="() => deleteTag(this.title)" icon="close" />
    <div class="text-[16px] mb-1">
      {{ title }}
    </div>
  </div>
</template>
