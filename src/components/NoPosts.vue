<script setup>
import PostSkeleton from "./Skeleton/PostSkeleton.vue";
</script>

<template>
  <div class="flex flex-col mt-10 m-auto justify-center">
    <h1 class="text-[18px] text-center font-semibold pb-5">
      No posts yet...🔭
    </h1>
    <PostSkeleton />
    <PostSkeleton />
  </div>
</template>
