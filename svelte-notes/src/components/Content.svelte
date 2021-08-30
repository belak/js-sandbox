<script lang="ts">
  import Sidebar from "./Sidebar.svelte";
  import Editor from "./Editor.svelte";
</script>

<div class="content-container">
  <Sidebar />
  <Editor />
</div>

<style>
  .content-container {
    background-color: #cccccc;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    border-left: solid black 1px;
    border-right: solid black 1px;
    width: 100%;

    /* Same styles as in Container */
    max-width: 1024px;
    margin: auto;

    margin-top: 0;
    margin-bottom: 0;
  }
</style>
