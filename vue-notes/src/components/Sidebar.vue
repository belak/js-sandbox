<script setup lang="ts">
import { computed, ComputedRef } from "vue";

import { Note, useAppStore } from "@/store";

const store = useAppStore();
const notes: ComputedRef<Note[]> = computed(() => store.getters.notes);

const createNote = () => store.commit("createNote");
const setCurrentNote = (note: Note) => store.commit("setCurrentNote", note);
const removeNote = (note: Note) => store.commit("removeNote", note);
</script>

<template>
  <div id="sidebar">
    <button @click="createNote">New Note</button>
    <table className="notes-list">
      <tbody>
        <tr v-for="note in notes" :key="note.id">
          <td @click="setCurrentNote(note)" v-text="note.title"></td>
          <td className="actions" @click="removeNote(note)">[x]</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
#sidebar {
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
