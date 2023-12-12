<script>
import { fetchData } from "../helpers/fetchData";
import Post from "../components/Post.vue";

export default {
  data() {
    return {
      posts: "",
    };
  },

  methods: {
    getAllPosts() {
      fetchData({
        url: `/post/all`,
        method: "GET",
        auth: localStorage.getItem("jwt"),
      }).then((data) => {
        this.posts = data;
      });
    },
  },
  async mounted() {
    this.getAllPosts();
  },
  components: { Post },
};
</script>

<template>
  <div class="mt-10" @click="console.log(posts)" v-for="(value, name) in posts">
    <Post
      :author="value.author"
      :description="value.description"
      :date="value.createdAt"
      :_id="value._id"
      :username="value.username"
    />
  </div>
</template>
