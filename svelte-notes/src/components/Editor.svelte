<script lang="ts">
  import { sanitize } from "dompurify";
  import marked from "marked";

  import { currentNote } from "../store";

  let preview: boolean = false;

  const renderedNote = (content: string) => sanitize(marked(content));
</script>

<div class="editor">
  <div class="metadata">
    <input
      value={$currentNote.title}
      on:input={(event) => ($currentNote.title = event.currentTarget.value)}
    />
    <button
      on:click={() => {
        preview = !preview;
      }}>Toggle Preview</button
    >
  </div>
  {#if preview}
    <div>{@html renderedNote($currentNote.content)}</div>
  {:else}
    <textarea
      value={$currentNote.content}
      on:input={(event) => ($currentNote.content = event.currentTarget.value)}
    />
  {/if}
</div>

<style>
  .editor {
    flex-grow: 3;
    padding: 1em;
    display: flex;
    flex-direction: column;
  }

  .metadata {
    display: flex;
  }

  button {
    flex-grow: 0;
    margin-left: 10px;
  }

  input {
    flex-grow: 1;
    margin: 0 0 5px 0;
    padding: 0;
    box-sizing: border-box;
    border: solid black 1px;
    border-radius: 0;
  }

  textarea {
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: solid black 1px;
    border-radius: 0;
    flex-grow: 1;
  }
</style>
