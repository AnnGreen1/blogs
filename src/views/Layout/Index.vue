<template>
    <div class="layoutview">
      <NavBar></NavBar>
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  import NavBar from "./components/NavBar.vue";
  export default {
    data() {
      return {};
    },
    components: {
      NavBar,
    },
    methods: {},
    created() {},
  };
  </script>
  
  <style lang="scss" scoped>
  .layoutview {
    background-color: pink;
  }
  </style>
  