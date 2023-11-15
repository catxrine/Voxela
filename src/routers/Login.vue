<script>
import FormInput from "../components/FormInput.vue";
import { logIn } from "../helpers/actions";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    logIn,
  },
  components: { FormInput },
};
</script>

<template>
  <div
    class="min-h-screen px-4 flex flex-col items-center justify-center sm:bg-gray-100 bg-gray-50"
  >
    <div
      class="sm:flex sm:flex-col sm:border-t-8 sm:border-gray-800 sm:bg-white sm:shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:rounded-xl sm:w-50 sm:w-md w-full max-w-[400px]"
    >
      <div class="title-big">Welcome to Voxela</div>
      <hr />
      <div
        class="mt-1 text-center gabarito text-[16px] sm:text-sm text-gray-800"
      >
        Share your thoughts and stories with us!
      </div>

      <div class="mt-8">
        <form
          @submit="
            ($event) => {
              $event.preventDefault();
              logIn({ email, password });
            }
          "
        >
          <FormInput icon="fas fa-at" label="E-Mail Address">
            <input
              type="text"
              class="input-primary"
              placeholder="Email"
              v-model="email"
          /></FormInput>

          <FormInput icon="fas fa-lock" label="Password">
            <input
              type="password"
              class="input-primary"
              placeholder="●●●●●●●●●"
              v-model="password"
          /></FormInput>

          <button type="submit" class="btn-primary">
            <span class="mr-2 uppercase">Login</span>
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
          >Don't have an account?
          <a href="/register" class="text-xs ml-2 text-blue-500 font-semibold"
            >Register</a
          ></span
        >
      </a>
    </div>
  </div>
</template>
