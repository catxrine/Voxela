<script setup>
import { getCurrentUserId } from "../helpers/utils";
import { editProfile } from "../helpers/actions/userActions";
import { deleteTag } from "../helpers/actions/tagActions";
import { fetchData } from "../helpers/fetchData";
import { reactive, onMounted } from "vue";

import Icon from "../components/Icon.vue";

const state = reactive({
  usernameValue: "",
  emailValue: "",
  currentTag: "",
  currentUser: null,
});

const getCurrentUserData = () => {
  fetchData({
    url: `/user/${getCurrentUserId()}`,
    method: "GET",
    auth: localStorage.getItem("jwt"),
  }).then((data) => {
    state.currentUser = data;
    state.emailValue = data.email;
    state.usernameValue = data.username;
  });
};
const updateProfile = () => {
  editProfile(state.usernameValue, state.emailValue, state.currentTag).then(
    () => {
      getCurrentUserData();
      state.currentTag = null;
    }
  );
};
onMounted(getCurrentUserData);
</script>

<template>
  <form
    @submit.prevent="updateProfile"
    class="w-full max-w-lg flex gap-8 justify-center flex-col md:my-10 py-20 px-5 m-auto"
  >
    <div class="w-full flex-wrap px-3">
      <label class="label">Nickname</label>
      <input class="input-tertiary" v-model="state.usernameValue" />
    </div>

    <div class="w-full flex-wrap px-3">
      <label class="label">E-mail</label>
      <input class="input-tertiary" type="email" v-model="state.emailValue" />
    </div>

    <div class="w-full px-3 flex-wrap">
      <aside class="rounded-lg border-2 border-slate-600 p-4">
        <h2 class="font-os mb-1 text-lg font-bold">Tags</h2>
        <input type="text" class="input-tertiary" v-model="state.currentTag" />

        <ul class="flex gap-2 items-start flex-wrap mt-4">
          <div v-for="value in state.currentUser?.tags">
            <div class="tag-secondary flex flex-row gap-2 text-center">
              <Icon
                icon="cancel"
                :actions="
                  () => deleteTag(value).then(() => getCurrentUserData())
                "
              />
              <div class="text-[16px] mb-1">
                {{ value }}
              </div>
            </div>
          </div>
        </ul>
      </aside>
    </div>

    <div class="md:w-1/3 md:flex md:items-center">
      <button class="btn-primary" type="submit">Update</button>
    </div>
  </form>
</template>
