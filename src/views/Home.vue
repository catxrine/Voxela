<script setup>
import { ref, onMounted } from "vue";
import Post from "../components/Post.vue";
import { getAllPosts } from "../helpers/actions/postActions";

const posts = ref("");

const refetch = async () => {
  const data = await getAllPosts();
  posts.value = data;
};

onMounted(() => {
  refetch();
});
</script>

<template>
  <div class="h-full overflow-auto flex flex-col">
    <div
      class="mt-10 flex justify-center"
      v-for="value in posts"
      :key="value._id"
    >
      <Post :refetch="refetch" :post="value" />
    </div>
  </div>
</template>
