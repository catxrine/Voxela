<script setup>
import { ref, reactive, computed } from "vue";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

import { logIn } from "../helpers/actions/auth";
import { APP_SLOGAN } from "../constants/constants.js";

import FormInput from "../components/FormInput.vue";

const slogan = ref(APP_SLOGAN);
const state = reactive({
  email: "",
  password: "",
});

const validations = computed(() => ({
  email: { required, email },
  password: { required, minLength: minLength(6), maxLength: maxLength(16) },
}));
const v$ = useVuelidate(validations, state);

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (isValid) {
    logIn(state);
  }
};
</script>

<template>
  <div
    class="min-h-screen px-4 flex flex-col items-center justify-center sm:bg-gray-100 bg-gray-50"
  >
    <div
      class="sm:flex sm:flex-col sm:border-t-8 sm:border-gray-800 sm:bg-white sm:shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:rounded-xl sm:w-50 sm:w-md w-full max-w-[400px]"
    >
      <div class="title-lg">Welcome to Voxela</div>
      <hr />
      <div
        class="mt-1 text-center gabarito text-[16px] sm:text-sm text-gray-800"
      >
        {{ slogan }}
      </div>

      <div class="mt-8">
        <form @submit.prevent="handleSubmit">
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
            :error="v$.password.$errors"
            icon="fas fa-lock"
            label="Password"
          >
            <input
              type="password"
              class="input-primary"
              placeholder="●●●●●●●●●"
              v-model="state.password"
            />
          </FormInput>
          <button type="submit" class="btn-primary">Login</button>
        </form>
      </div>
    </div>
    <div class="flex justify-center items-center mt-6">
      <p
        class="inline-flex ml-2 items-center text-gray-700 font-medium text-xs text-center"
      >
        Don't have an account?
        <router-link to="/register" class="link">Register</router-link>
      </p>
    </div>
  </div>
</template>
