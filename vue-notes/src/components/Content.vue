<script setup lang="ts">
import Editor from "./Editor.vue";
import Sidebar from "./Sidebar.vue";
</script>

<template>
  <div id="content">
    <div className="container">
      <Sidebar />
      <Editor />
    </div>
  </div>
</template>

<style scoped>
#content {
  flex-grow: 1;
  display: flex;
}

.container {
  background-color: #cccccc;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  margin-top: 0;
  margin-bottom: 0;
  border-left: solid black 1px;
  border-right: solid black 1px;
}
</style>
