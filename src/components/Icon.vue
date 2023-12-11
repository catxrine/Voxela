<script>
export default {
  props: ["icon", "style", "actions"],
};
</script>
<template>
  <span
    @click="actions"
    :class="`material-symbols-outlined cursor-pointer ${style}`"
  >
    {{ icon }}
  </span>
</template>
