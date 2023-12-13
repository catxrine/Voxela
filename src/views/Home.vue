<script>
import Post from "../components/Post.vue";
import { getAllPosts } from "../helpers/actions/postActions";

export default {
  data() {
    return {
      posts: "",
    };
  },

  methods: {
    getAllPosts,
    refetch() {
      this.getAllPosts().then((data) => {
        this.posts = data;
      });
    },
  },
  mounted() {
    this.refetch();
  },
  components: { Post },
};
</script>

<template>
  <div class="h-full overflow-hidden md:overflow-auto flex flex-col">
    <div class="mt-10" v-for="value in posts" :key="value._id">
      <Post
        :refetch="refetch"
        :author="value.author"
        :description="value.description"
        :date="value.createdAt"
        :_id="value._id"
        :username="value.username"
      />
    </div>
  </div>
</template>
