<script setup>
import { logOut } from "../helpers/actions/auth";
</script>

<template>
  <div
    class="border-r-2 flex lg:flex-col flex-row justify-between border-gray-300 bg-white lg:h-screen transition-all duration-200 p-2 ease-in-out overflow-hidden"
  >
    <div
      class="flex flex-row lg:flex-col lg:justify-normal justify-between w-full"
    >
      <router-link
        to="/followers"
        class="fas fa-users nav-icon text-xl lg:hidden block"
      />
      <router-link to="/profile" class="fas fa-user-circle nav-icon text-xl" />

      <router-link to="/home" class="fas fa-home nav-icon text-xl" />
      <router-link to="/settings" class="fas fa-wrench nav-icon text-xl" />

      <router-link
        @click="logOut"
        to="/"
        class="fas fa-door-open nav-icon text-xl lg:hidden block"
      />
    </div>
    <router-link
      @click="logOut"
      to="/"
      class="fas fa-door-open lg:block hidden nav-icon text-xl"
    />
  </div>
</template>
