<script lang="ts">
  import type { Note } from "../store";
  import { notes, currentNote } from "../store";
  const setCurrentNote = (note: Note) => {};
  const removeNote = (note: Note) => {};
</script>

<div class="sidebar">
  <button on:click={() => currentNote.reset()}>New Note</button>
  <table class="notes-list">
    <tbody>
      {#each $notes as note}
        <tr>
          <td on:click={() => ($currentNote = note)}>{note.title}</td>
          <td class="actions" on:click={() => notes.removeNote(note)}>[x]</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .sidebar {
    flex-grow: 0;
    padding: 20px;
    max-width: 15em;
  }

  button {
    width: 100%;
  }

  .notes-list {
    width: 100%;
  }

  .notes-list .actions {
    text-align: right;
  }
</style>
