<script>
import { getCurrentUserId } from "../helpers/utils";
import { editProfile } from "../helpers/actions/userActions";
import { deleteTag } from "../helpers/actions/tagActions";
import { fetchData } from "../helpers/fetchData";

import Icon from "../components/Icon.vue";
export default {
  data() {
    return {
      usernameValue: "",
      emailValue: "",
      currentTag: "",
      currentUser: "",
    };
  },
  methods: {
    getCurrentUserData() {
      fetchData({
        url: `/user/${this.getCurrentUserId()}`,
        method: "GET",
        auth: localStorage.getItem("jwt"),
      }).then((data) => {
        this.currentUser = data;
        this.emailValue = data.email;
        this.usernameValue = data.username;
      });
    },
    editProfile,
    deleteTag,
    getCurrentUserId,
  },
  mounted() {
    this.getCurrentUserData();
  },
  components: { Icon },
};
</script>

<template>
  <form
    @submit.prevent="
      () => {
        editProfile(usernameValue, emailValue, currentTag).then(() => {
          getCurrentUserData();
          currentTag = null;
        });
      }
    "
    class="w-full max-w-lg flex justify-center flex-col md:my-10 py-20 px-5 m-auto"
  >
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label class="label">Nickname</label>
        <input class="input-tertiary" v-model="usernameValue" />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label class="label">E-mail</label>
        <input class="input-tertiary" type="email" v-model="emailValue" />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <aside class="rounded-lg border-2 border-slate-600 p-4">
          <h2 class="font-os mb-1 text-lg font-bold">Tags</h2>
          <input type="text" class="input-tertiary" v-model="currentTag" />

          <ul class="flex gap-2 items-start flex-wrap mt-4">
            <div v-for="value in currentUser?.tags">
              <div class="tag-secondary flex flex-row gap-2 text-center">
                <Icon
                  :actions="
                    () => deleteTag(value).then(() => getCurrentUserData())
                  "
                  icon="cancel"
                />
                <div class="text-[16px] mb-1">
                  {{ value }}
                </div>
              </div>
            </div>
          </ul>
        </aside>
      </div>
    </div>
    <div class="md:flex md:items-center">
      <div class="md:w-1/3">
        <button class="btn-primary" type="submit">Send</button>
      </div>
    </div>
  </form>
</template>
