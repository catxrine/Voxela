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
  <div class="relative inline-block text-left">
    <div class="group">
      <div @click="() => toggleDropdown()">
        <Icon icon="more_horiz" />
      </div>

      <div
        v-if="show"
        class="absolute left-0 origin-top-left divide-y bg-gray-50 border-t-2 border-x-2 border-gray-900/10 divide-gray-100 rounded-md shadow-lg transition duration-300"
      >
        <div class="flex flex-col">
          <div
            @click="
              () => {
                console.log(this._id);
                deletePost(this._id);
              }
            "
            class="flex flex-row gap-1 border-b-4 hover:text-red-600 hover:bg-red-50 hover:border-red-600 py-1 px-1.5"
          >
            <Icon icon="delete" />
            <p>Delete</p>
          </div>
          <div
            class="border-b-4 flex flex-row gap-1 rounded hover:border-green-600 hover:bg-green-50 hover:text-green-600 py-1 px-1.5"
          >
            <Icon icon="border_color" />
            <p>Edit</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
