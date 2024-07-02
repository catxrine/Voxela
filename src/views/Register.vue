<script setup>
import { ref, computed, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import FormInput from "../components/FormInput.vue";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

import { APP_SLOGAN } from "../constants/constants";
import { registerUser } from "../helpers/actions/auth";

const slogan = ref(APP_SLOGAN);
const state = reactive({
  username: "",
  email: "",
  password: "",
});

const validations = computed(() => ({
  username: { required, minLength: minLength(3), maxLength: maxLength(10) },
  email: { required, email },
  password: { required, minLength: minLength(6), maxLength: maxLength(16) },
}));

const v$ = useVuelidate(validations, state);

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (isValid) {
    registerUser(state);
  }
};
</script>

<template>
  <div
    class="min-h-screen px-4 flex flex-col items-center justify-center sm:bg-gray-100 bg-gray-50"
  >
    <div
      class="sm:flex sm:flex-col sm:border-t-8 sm:border-gray-800 sm:bg-white sm:shadow-md sm:px-6 md:px-8 lg:px-10 py-8 rounded-xl sm:w-[60vw] sm:max-w-[540px] max-w-[400px] w-full"
    >
      <div class="title-lg">Welcome to Voxela</div>
      <hr />
      <div class="mt-1 text-center gabarito text-[16px] text-gray-800">
        {{ slogan }}
      </div>

      <form class="mt-8" @submit.prevent="handleSubmit">
        <FormInput
          icon="fas fa-user"
          :error="v$.username.$errors"
          label="Username"
        >
          <input
            type="text"
            class="input-primary"
            placeholder="Enter your username"
            v-model="state.username"
          />
        </FormInput>
        <FormInput
          icon="fas fa-at"
          :error="v$.email.$errors"
          label="E-Mail Address"
        >
          <input
            type="text"
            class="input-primary"
            placeholder="Email"
            v-model="state.email"
          />
        </FormInput>
        <FormInput
          icon="fas fa-lock"
          :error="v$.password.$errors"
          label="Password"
        >
          <input
            type="password"
            class="input-primary"
            placeholder="●●●●●●●●●"
            v-model="state.password"
          />
        </FormInput>
        <button type="submit" class="btn-primary">Register</button>
      </form>
    </div>
    <p
      class="inline-flex ml-2 items-center text-gray-700 font-medium mt-6 text-xs text-center"
    >
      Already have an account?
      <router-link to="/" class="link"> Login </router-link>
    </p>
  </div>
</template>
