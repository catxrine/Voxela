<script setup>
import Icon from "./Icon.vue";
import { reactive } from "vue";

const emit = defineEmits(["newTag", "removeTag"]);

const props = defineProps({ tags: Array });
const state = reactive({
  currentTag: "",
});

const addTag = () => {
  if (state.currentTag.trim() && !props.tags.includes(state.currentTag)) {
    emit("newTag", state.currentTag.trim());
    state.currentTag = "";
  }
};
const removeTag = (tag) => {
  emit("removeTag", tag);
};
</script>

<template>
  <aside class="rounded-lg max-w-[28rem] border border-gray-200/80 p-4">
    <h2 class="font-os mb-1 text-lg font-bold">Tags</h2>
    <input
      @keydown.enter="addTag"
      type="text"
      class="input-tertiary"
      v-model="state.currentTag"
    />

    <ul class="flex gap-2 items-start flex-wrap mt-4">
      <div
        v-for="(value, index) in props.tags"
        :key="index"
        :class="`tag-primary flex flex-row gap-2 text-center`"
      >
        <Icon icon="cancel" @click="removeTag(value)" />
        <div class="text-[16px] mb-1">
          {{ value }}
        </div>
      </div>
    </ul>
  </aside>
</template>
