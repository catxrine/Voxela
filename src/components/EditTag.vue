<script>
import Icon from "./Icon.vue";
import { deleteTag } from "../helpers/actions/tagActions";
export default {
  props: ["title"],
  methods: {
    deleteTag,
  },
  components: { Icon },
};
</script>
<template>
  <div class="tag-secondary flex flex-row gap-2 text-center justify-center">
    <Icon :actions="() => deleteTag(this.title)" icon="cancel" />
    <div class="text-[16px] mb-1">
      {{ title }}
    </div>
  </div>
</template>
