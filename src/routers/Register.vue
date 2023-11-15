<script>
import FormInput from "../components/FormInput.vue";
import { registerUser } from "../helpers/actions";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
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
      class="sm:flex sm:flex-col sm:border-t-8 sm:border-gray-800 sm:bg-white sm:shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-xl sm:w-[60vw] sm:max-w-[540px] max-w-[400px] w-full"
    >
      <div class="title-big">Welcome to Voxela</div>
      <hr />
      <div class="mt-1 text-center gabarito text-[16px] text-gray-800">
        Share your thoughts and stories with us!
      </div>

      <div class="mt-8">
        <form
          @submit="
            ($event) => {
              $event.preventDefault();
              registerUser({
                username: username,
                email: email,
                password: password,
              });
            }
          "
        >
          <div class="flex sm:flex-row flex-col sm:gap-6">
            <FormInput icon="fas fa-user" label="Username">
              <input
                type="text"
                class="input-primary"
                placeholder="Enter your username"
                v-model="username"
            /></FormInput>
            <FormInput icon="fas fa-at" label="E-Mail Address">
              <input
                type="text"
                class="input-primary"
                placeholder="Email"
                v-model="email"
            /></FormInput>
          </div>
          <div class="flex sm:flex-row flex-col sm:gap-6">
            <FormInput icon="fas fa-lock" label="Password">
              <input
                type="password"
                class="input-primary"
                placeholder="●●●●●●●●●"
                v-model="password"
            /></FormInput>
            <FormInput icon="fas fa-lock" label="Repeat Password">
              <input
                type="password"
                class="input-primary"
                placeholder="●●●●●●●●●"
                v-model="repeatPassword"
            /></FormInput>
          </div>

          <button type="submit" class="btn-primary">
            <span class="mr-2 uppercase">Register</span>
          </button>
        </form>
      </div>
    </div>
    <div class="flex justify-center items-center mt-6">
      <a
        href="#"
        target="_blank"
        class="inline-flex items-center text-gray-700 font-medium text-xs text-center"
      >
        <span class="ml-2"
          >Have have an account?
          <a href="/" class="text-xs ml-2 text-blue-500 font-semibold"
            >Login</a
          ></span
        >
      </a>
    </div>
  </div>
</template>
