<script>
import NavBar from "../components/NavBar.vue";
import Followers from "./Followers/Followers.vue";

export default {
  components: { NavBar, Followers },
};
</script>

<template>
  <div class="flex h-screen">
    <NavBar />
    <div class="flex-1">
      <div
        className="grid h-full grid-flow-row grid-cols-[15em_1fr] lg:grid-cols-[20em_1fr] grid-rows-1"
      >
        <div className="overflow-x-auto border-r-2 border-base-subtle">
          <Followers />
        </div>
        <div className="row-span-2 h-full overflow-x-auto">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
