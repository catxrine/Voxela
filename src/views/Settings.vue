<script setup>
import { getCurrentUserId } from "../helpers/utils";
import { editProfile } from "../helpers/actions/userActions";
import { deleteTag } from "../helpers/actions/tagActions";
import { fetchData } from "../helpers/fetchData";
import { reactive, onMounted } from "vue";
import { useUserStore } from "../store/userStore";
import MiniCard from "../components/MiniCard.vue";
import Tag from "../components/Tag.vue";
import Icon from "../components/Icon.vue";

const state = reactive({
  usernameValue: "",
  emailValue: "",
  currentTag: "",
  currentAccent: "",
  currentUser: null,
});
const store = useUserStore();

const getCurrentUserData = () => {
  fetchData({
    url: `/user/${getCurrentUserId()}`,
    method: "GET",
    auth: localStorage.getItem("jwt"),
  }).then((data) => {
    state.currentUser = data;
    state.emailValue = data.email;
    state.usernameValue = data.username;
    state.currentAccent = data.accent;
  });
};
const updateProfile = (e) => {
  editProfile(
    state.usernameValue,
    state.emailValue,
    state.currentTag,
    state.currentAccent
  ).then(() => {
    document.body.className = "theme-" + state.currentAccent;
    getCurrentUserData();
    state.currentTag = null;
  });
};
onMounted(getCurrentUserData);
const accents = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-pink-500",
  "bg-rose-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-orange-500",
];
</script>

<template>
  <form
    @submit.prevent="updateProfile"
    class="w-full flex gap-8 md:px-20 justify-center flex-col md:my-10 py-20 px-5 m-auto"
  >
    <div class="flex flex-row gap-3">
      <div class="w-full flex-wrap">
        <label class="label">Nickname</label>
        <input class="input-tertiary" v-model="state.usernameValue" />
      </div>

      <div class="w-full flex-wrap">
        <label class="label">E-mail</label>
        <input class="input-tertiary" type="email" v-model="state.emailValue" />
      </div>
    </div>
    <div class="flex flex-row justify-between">
      <!-- <h1 class="font-os mb-1 text-xl font-bold">Appearance</h1> -->
      <div class="flex flex-col gap-8">
        <div class="w-full flex-wrap">
          <h1 class="font-os mb-1 text-xl font-bold">Appearance</h1>
          <aside class="rounded-lg border border-gray-200/80 p-4">
            <h2 class="font-os mb-1 text-lg font-bold">Tags</h2>
            <input
              type="text"
              class="input-tertiary"
              v-model="state.currentTag"
            />

            <ul class="flex gap-2 items-start flex-wrap mt-4">
              <div
                v-for="value in state.currentUser?.tags"
                :class="`tag-secondary flex flex-row gap-2 text-center`"
              >
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
            </ul>
          </aside>
        </div>

        <div class="w-full rounded-lg border border-gray-200/80 p-4 flex-wrap">
          <aside class="rounded-lg">
            <h2 class="font-os mb-1 text-lg font-bold">Profile Accent</h2>
            <ul class="flex gap-2 items-start flex-wrap mt-4">
              <div class="grid grid-cols-6 gap-4">
                <div v-for="value in accents">
                  <div
                    @click="() => (state.currentAccent = value.split('-')[1])"
                    :class="`p-6 rounded ${value} ${
                      value.includes(state.currentAccent) &&
                      'border-2 border-black'
                    }`"
                  ></div>
                </div>
              </div>
            </ul>
          </aside>
        </div>
      </div>
      <div>
        <h1 class="font-os mb-1 text-xl font-bold">Preview</h1>

        <div
          :class="`flex theme-${state.currentAccent} md:flex-row flex-col md:justify-normal md:items-start justify-center items-center rounded-lg border border-gray-200/80 bg-white py-6 md:px-6 h-full`"
        >
          <img
            class="flex mb-2 md:m-0 md:h-[130px] md:w-[130px] h-[100px] w-[100px] bg-cover bg-center rounded"
            src="/finn.jpeg"
          />

          <div
            class="flex justify-center md:w-full md:ml-6 items-center md:justify-normal md:items-start flex-col"
          >
            <h2 class="text-lg font-semibold">
              @{{ store.viewedProfile?.username }}
            </h2>

            <div class="my-2 flex flex-row space-x-2">
              <template v-for="value in store.viewedProfile?.tags">
                <Tag :title="value" />
              </template>
            </div>
            <div class="md:mt-2 flex flex-row flex-wrap items-center space-x-5">
              <MiniCard
                title="Posts"
                :data="store.viewedProfile?.posts?.length"
                icon="style"
              />
              <MiniCard
                title="Followers"
                :data="store.viewedProfile?.followers?.length"
                icon="group"
              />
              <MiniCard
                title="Followed"
                :data="store.viewedProfile?.followed?.length"
                icon="person_check"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md:w-1/3 md:flex md:items-center">
      <button class="btn-primary" type="submit">Update</button>
    </div>
  </form>
</template>
