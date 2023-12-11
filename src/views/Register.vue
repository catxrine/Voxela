<script>
import FormInput from "../components/FormInput.vue";
import { registerUser } from "../helpers/actions/auth";
import { APP_SLOGAN } from "../constants/constants";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      slogan: APP_SLOGAN,
    };
  },
  methods: {
    registerUser,
  },
  components: { FormInput },
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

      <div class="mt-8">
        <form
          @submit.prevent="
            registerUser({
              username: username,
              email: email,
              password: password,
            })
          "
        >
          <FormInput icon="fas fa-user" label="Username">
            <input
              required
              type="text"
              class="input-primary"
              placeholder="Enter your username"
              v-model="username"
            />
          </FormInput>
          <FormInput icon="fas fa-at" label="E-Mail Address">
            <input
              required
              type="text"
              class="input-primary"
              placeholder="Email"
              v-model="email"
            />
          </FormInput>
          <FormInput icon="fas fa-lock" label="Password">
            <input
              required
              type="password"
              class="input-primary"
              placeholder="●●●●●●●●●"
              v-model="password"
            />
          </FormInput>

          <button type="submit" class="btn-primary">Register</button>
        </form>
      </div>
    </div>
    <div class="flex justify-center items-center mt-6">
      <p
        class="inline-flex ml-2 items-center text-gray-700 font-medium text-xs text-center"
      >
        Already have an account?
        <router-link to="/" class="link"> Login </router-link>
      </p>
    </div>
  </div>
</template>
