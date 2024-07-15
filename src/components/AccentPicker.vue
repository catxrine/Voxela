<script setup>
import { defineProps, defineEmits } from "vue";
import { accents } from "../helpers/utils";

const props = defineProps({ accent: String });
const emit = defineEmits(["accent"]);

const onClick = (color) => {
  emit("accent", color);
};
</script>

<template>
  <div class="w-full rounded-lg border border-gray-200/80 p-4 flex-wrap">
    <aside class="rounded-lg">
      <h2 class="font-os mb-1 text-lg font-bold">Accent</h2>
      <ul class="flex gap-2 items-start flex-wrap mt-4">
        <div class="grid grid-cols-6 gap-4">
          <div v-for="value in accents">
            <div
              @click="() => onClick(value.split('-')[1])"
              :class="`p-6 rounded ${value} ${
                value.includes(props.accent) && 'border-2 border-black'
              }`"
            ></div>
          </div>
        </div>
      </ul>
    </aside>
  </div>
</template>
