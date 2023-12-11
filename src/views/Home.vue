<script>
import { publicPost } from "../helpers/actions/actions";
import { useRoute } from "vue-router";
import Layout from "../components/Layout.vue";
export default {
  data() {
    return {
      description: "",
    };
  },
  components: { Layout },
  methods: {
    publicPost,
  },
};
</script>

<template></template>
