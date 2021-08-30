<script setup lang="ts">
import Header from "./components/Header.vue";
import Content from "./components/Content.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div id="app">
    <Header />
    <Content />
    <Footer />
  </div>
</template>

<style>
body {
  margin: 0;
}

.container {
  max-width: 1024px;
  margin: auto;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: #333333;
}
</style>
