<script setup lang="ts">
import { computed, ComputedRef, ref } from "vue";
import { sanitize } from "dompurify";
import marked from "marked";

import { useAppStore, Note } from "@/store";

const store = useAppStore();

const preview = ref(false);

const note: ComputedRef<Note> = computed(() => store.getters.currentNote);
const renderedNote = computed(() => sanitize(marked(note.value.content)));

const titleOnChange = (event: Event) =>
  store.commit("updateNote", {
    ...note.value,
    title: (event.target as HTMLInputElement).value,
  });

const editorOnChange = (event: Event) =>
  store.commit("updateNote", {
    ...note.value,
    content: (event.target as HTMLTextAreaElement).value,
  });
</script>

<template>
  <div id="editor">
    <div className="metadata">
      <input :value="note.title" @input="titleOnChange" />
      <button @click="preview = !preview">Toggle Preview</button>
    </div>
    <div v-if="preview" v-html="renderedNote"></div>
    <textarea v-else :value="note.content" @input="editorOnChange"></textarea>
  </div>
</template>

<style scoped>
#editor {
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
