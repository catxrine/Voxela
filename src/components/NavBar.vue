<script>
import { logOut } from "../helpers/actions/auth";
export default {
  methods: {
    logOut,
  },
};
</script>

<template>
  <div
    class="border-r-2 flex flex-col justify-between border-gray-300 bg-white h-screen transition-all duration-200 p-2 ease-in-out overflow-hidden"
  >
    <div>
      <router-link to="/home" class="fas fa-home nav-icon text-xl" />

      <router-link to="/profile" class="fas fa-user nav-icon text-xl" />

      <router-link to="/settings" class="fas fa-wrench nav-icon text-xl" />
    </div>
    <div @click="logOut()">
      <router-link to="/" class="fas fa-door-open nav-icon text-xl" />
    </div>
  </div>
</template>
