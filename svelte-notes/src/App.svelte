<script lang="ts">
  import Header from "./components/Header.svelte";
  import Content from "./components/Content.svelte";
  import Footer from "./components/Footer.svelte";
</script>

<main>
  <Header />
  <Content />
  <Footer />
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    color: #333333;
  }
</style>
