<script setup>
import { reactive, onMounted, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { editProfile } from "../helpers/actions/userActions";
import { getCurrentUserId } from "../helpers/utils";
import { useUserStore } from "../store/userStore";
import { fetchData } from "../helpers/fetchData";
import { errorSnackBar } from "../components/snackbars";
import AccentPicker from "../components/AccentPicker.vue";
import TagsPicker from "../components/TagsPicker.vue";
import MiniCard from "../components/MiniCard.vue";
import FormInput from "../components/FormInput.vue";
import Tag from "../components/Tag.vue";
import { themes } from "../main";

const store = useUserStore();
const state = reactive({
  username: "",
  email: "",
  accent: "",
  tags: [],
  currentUser: null,
});

const validations = computed(() => ({
  email: { required, email },
  username: { required },
}));
const v$ = useVuelidate(validations, state);

const getCurrentUserData = () => {
  fetchData({
    url: `/user/${getCurrentUserId()}`,
    method: "GET",
    auth: localStorage.getItem("jwt"),
  }).then((data) => {
    const { email, username, accent, tags } = data;
    state.currentUser = data;
    Object.assign(state, { email, username, accent, tags });
  });
};

const updateProfile = async () => {
  const isValid = await v$.value.$validate();
  if (isValid) {
    editProfile(state)
      .then(() => {
        getCurrentUserData();
        localStorage.setItem("accent", state.accent);
        themes.accent = state.accent;
      })
      .catch((res) => {
        errorSnackBar(res);
      });
  }
};

onMounted(getCurrentUserData);
</script>

<template>
  <form
    @submit.prevent="updateProfile"
    :class="`w-full h-full flex gap-11 md:px-20 justify-center items-center m-0 flex-col py-20 px-5`"
  >
    <div class="flex flex-row gap-40">
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-3">
          <FormInput class="w-full flex-wrap" :error="v$.username.$errors">
            <label class="label">Nickname</label>
            <input class="input-tertiary" v-model="state.username" />
          </FormInput>

          <FormInput class="w-full flex-wrap" :error="v$.email.$errors">
            <label class="label">Nickname</label>
            <input class="input-tertiary" v-model="state.email" />
          </FormInput>
        </div>
        <div class="w-full flex-wrap">
          <h1 class="font-os mb-1 text-xl font-bold">Appearance</h1>
          <TagsPicker
            :tags="state.tags"
            @newTag="(tag) => state.tags.push(tag)"
            @removeTag="
              (tag) => (state.tags = state.tags.filter((t) => t !== tag))
            "
          />
        </div>
        <AccentPicker
          :accent="state.accent"
          @accent="(accent) => (state.accent = accent)"
        />
      </div>
      <div class="row-span-2 flex flex-col h-full overflow-auto">
        <h1 class="font-os mb-1 text-xl font-bold">Preview</h1>
        <div
          :class="`flex px-7 max-w-[30rem] theme-${state.accent} flex-col items-center rounded-lg border border-gray-200/80 bg-white py-6 h-full`"
        >
          <img
            class="flex mb-2 h-[100px] w-[100px] bg-cover bg-center rounded"
            src="/finn.jpeg"
          />

          <div class="flex justify-center items-center flex-col">
            <h2 class="text-lg font-semibold">@{{ state.username }}</h2>
            <div class="my-2 flex flex-row flex-wrap gap-2 justify-center">
              <template
                v-for="value in [
                  ...(store?.profile?.tags || []),
                  state.tag,
                ]?.filter((el) => el?.length > 0)"
              >
                <Tag :title="value" />
              </template>
            </div>
            <div class="flex flex-row flex-wrap items-center space-x-5">
              <MiniCard
                title="Posts"
                :data="store.profile?.posts?.length"
                icon="style"
                class="md:w-24"
              />
              <MiniCard
                title="Followers"
                :data="store.profile?.followers?.length"
                icon="group"
                class="md:w-24"
              />
              <MiniCard
                title="Followed"
                :data="store.profile?.followed?.length"
                class="md:w-24"
                icon="person_check"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md:w-1/3 md:flex md:items-center">
      <button class="btn-primary">Update</button>
    </div>
  </form>
</template>
