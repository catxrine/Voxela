<script>
import Icon from "./Icon.vue";
import { deletePost } from "../helpers/actions/actions";

export default {
  props: ["_id"],
  components: { Icon },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    toggleDropdown() {
      !this.show ? (this.show = true) : (this.show = false);
    },
    deletePost,
  },
};
</script>
<template>
  <div class="inline-flex items-center rounded-md shadow-sm">
    <button
      class="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
    >
      <Icon icon="edit_square" />
      <span class="hidden md:inline-block">Edit</span>
    </button>

    <button
      class="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
    >
      <Icon icon="delete_forever" />
      <span class="hidden md:inline-block">Delete</span>
    </button>
  </div>
</template>
