<script>
import { mapState, mapActions } from "pinia";
import { useUserStore } from "../store/userStore";
import { getCurrentUserId } from "../helpers/utils";
import { editProfile } from "../helpers/actions/actions";
import EditTag from "../components/EditTag.vue";

export default {
  computed: {
    ...mapState(useUserStore, ["currentUser"]),
  },
  data() {
    return {
      usernameValue: "",
      emailValue: "",
      currentTag: "",
    };
  },
  methods: {
    ...mapActions(useUserStore, ["getCurrentUser"]),
    editProfile,
    getCurrentUserId,
  },
  mounted() {
    this.getCurrentUser(getCurrentUserId());
    this.usernameValue = this.currentUser?.username;
    this.emailValue = this.currentUser?.email;
  },
  components: { EditTag },
};
</script>

<template>
  <form
    @submit.prevent="
      () => {
        editProfile(getCurrentUserId(), usernameValue, emailValue, currentTag);
        currentTag = null;
      }
    "
    class="w-full max-w-lg flex justify-center flex-col m-auto mt-20"
  >
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-password"
        >
          Nickname
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          v-model="usernameValue"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-password"
        >
          E-mail
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="email"
          v-model="emailValue"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <aside class="rounded-lg border-2 border-slate-600 p-4">
          <h2 class="font-os mb-1 text-lg font-bold">Tags</h2>
          <input type="text" class="input-primary" v-model="currentTag" />
          <ul class="flex gap-2 items-start flex-wrap mt-4">
            <div v-for="value in currentUser?.tags">
              <EditTag :title="value" />
            </div>
          </ul>
        </aside>
      </div>
    </div>
    <div class="md:flex md:items-center">
      <div class="md:w-1/3">
        <button class="btn-primary" type="submit">Send</button>
      </div>
      <div class="md:w-2/3"></div>
    </div>
  </form>
</template>
