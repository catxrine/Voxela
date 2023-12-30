<script>
import NavBar from "../components/NavBar.vue";
import Followers from "./Followers/Followers.vue";

export default {
  components: { NavBar, Followers },
};
</script>

<template>
  <div class="flex h-screen">
    <template class="lg:block hidden">
      <NavBar />
    </template>
    <div class="flex-1">
      <div
        className="grid h-full grid-flow-row grid-cols-1 lg:grid-cols-[20em_1fr] grid-rows-1"
      >
        <div
          className="hidden md:block overflow-x-auto border-r-2 border-base-subtle"
        >
          <Followers />
        </div>
        <div className="row-span-2 h-full overflow-auto">
          <router-view />
        </div>

        <template class="lg:hidden block">
          <NavBar />
        </template>
      </div>
    </div>
  </div>
</template>
