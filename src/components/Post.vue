<script>
import Icon from "./Icon.vue";
import Dropdown from "./Dropdown.vue";
import { deletePost, editPost } from "../helpers/actions/postActions";
import { mapState, mapActions } from "pinia";
import { useUserStore } from "../store/userStore";
import { getCurrentUserId } from "../helpers/utils";

export default {
  props: ["author", "description", "date", "_id", "username"],

  data() {
    return {
      showDropdown: false,
      showEditInput: false,
      newDescription: this.description,
    };
  },
  computed: {
    ...mapState(useUserStore, ["profile"]),
  },
  methods: {
    toggleDropDown() {
      this.showDropdown = !this.showDropdown;
    },
    deletePost,
    editPost,
    getCurrentUserId,
    ...mapActions(useUserStore, ["setProfile"]),
  },
  components: { Icon, Dropdown },
};
</script>
<template>
  <div class="flex justify-center relative w-full">
    <div
      class="relative w-[600px] min-w-[400px] grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg"
    >
      <div class="relative flex gap-4">
        <img
          src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
          class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
        />
        <div class="flex flex-col w-full">
          <div class="flex flex-row justify-between">
            <p
              class="relative text-xl whitespace-nowrap truncate overflow-hidden"
            >
              {{ username }}
            </p>
            <div
              v-if="author === getCurrentUserId()"
              class="inline-flex items-center rounded-md shadow-sm"
            >
              <button
                @click="showEditInput = !showEditInput"
                class="text-slate-800 hover:text-green-500 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
              >
                <Icon icon="edit_square" />
                <span class="hidden md:inline-block">Edit</span>
              </button>

              <button
                @click="
                  () => {
                    deletePost(this._id).then(() =>
                      setProfile(getCurrentUserId())
                    );
                    newDescription = null;
                  }
                "
                class="text-slate-800 hover:text-red-500 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
              >
                <Icon icon="delete_forever" />
                <span class="hidden md:inline-block">Delete</span>
              </button>
            </div>
          </div>
          <p class="text-gray-400 text-sm">
            {{ new Date(date).toLocaleDateString() }},
            {{ new Date(date).toLocaleTimeString() }}
          </p>
        </div>
      </div>
      <p v-if="!showEditInput" class="-mt-4 text-gray-500">
        {{ newDescription }}
      </p>
      <input
        @keydown="
          (e) => {
            if (e.code === 'Enter') {
              editPost(_id, newDescription);
              showEditInput = false;
            }
          }
        "
        v-else
        type="text"
        class="input-primary"
        v-model="newDescription"
      />
    </div>
  </div>
</template>
