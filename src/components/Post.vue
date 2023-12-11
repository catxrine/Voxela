<script>
import Icon from "./Icon.vue";
import Dropdown from "./Dropdown.vue";
export default {
  props: ["author", "description", "date", "_id"],
  data() {
    return {
      showDropdown: false,
    };
  },
  components: { Icon, Dropdown },
  methods: {
    toggleDropDown() {
      !this.showDropdown
        ? (this.showDropdown = true)
        : (this.showDropdown = false);
    },
  },
};
</script>
<template>
  <div class="flex justify-center relative w-full">
    <div
      class="relative w-[600px] grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg"
    >
      <div class="relative flex gap-4">
        <img
          @click="console.log(this._id, this.date)"
          src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
          class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
          alt=""
          loading="lazy"
        />
        <div class="flex flex-col w-full">
          <div class="flex flex-row justify-between">
            <p
              class="relative text-xl whitespace-nowrap truncate overflow-hidden"
            >
              {{ author }}
            </p>

            <Dropdown :_id="this._id" />
          </div>
          <p class="text-gray-400 text-sm">
            {{ new Date(date).toLocaleDateString() }},
            {{ new Date(date).toLocaleTimeString() }}
          </p>
        </div>
      </div>
      <p class="-mt-4 text-gray-500">
        {{ description }}
      </p>
    </div>
  </div>
</template>
