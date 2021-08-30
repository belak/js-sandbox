import { derived, writable } from "svelte/store";
import { v4 as uuid_v4 } from "uuid";

export type Note = {
  id: string;
  title: string;
  content: string;
};

/*
const initialNotesState: NotesState = {
  notes: {},
  order: [],
};
*/

const blankNote: Note = {
  id: "",
  title: "",
  content: "",
};

type StoreState = {
  notes: {
    [key: string]: Note;
  };
  noteOrder: string[];
};

const initialState: StoreState = {
  notes: {
    "1": {
      id: "1",
      title: "note 1",
      content: "hello world note 1",
    },
    "2": {
      id: "2",
      title: "note 2",
      content: "hello world note 2",
    },
  },
  noteOrder: ["1", "2"],
};

const createNoteStore = () => {
  const { subscribe, update } = writable(initialState);

  const addNote = (note: Note) =>
    update((state) => ({
      notes: {
        ...state.notes,
        [note.id]: note,
      },
      noteOrder: [note.id, ...state.noteOrder],
    }));

  const removeNote = (note: Note) =>
    update((state) => {
      const { [note.id]: _, ...notes } = state.notes;
      return {
        notes,
        noteOrder: state.noteOrder.filter((id) => id !== note.id),
      };
    });

  const updateNote = (rawNote: Note) => {
    const note = rawNote.id
      ? rawNote
      : {
          ...rawNote,
          id: uuid_v4(),
        };

    update((state) => {
      return {
        notes: {
          ...state.notes,
          [note.id]: note,
        },
        noteOrder: state.notes[note.id]
          ? state.noteOrder
          : [note.id, ...state.noteOrder],
      };
    });

    return note;
  };

  return {
    subscribe,
    update,
    addNote,
    removeNote,
    updateNote,
  };
};

const createCurrentNoteStore = () => {
  const { subscribe, set, update } = writable<Note>({ ...blankNote });

  const wrappedSet = (rawNote: Note) => {
    set(rawNotes.updateNote(rawNote));
  };

  const wrappedUpdate = (cb: (note: Note) => Note) => {
    update((note: Note) => rawNotes.updateNote(cb(note)));
  };

  return {
    subscribe,
    set: wrappedSet,
    update: wrappedUpdate,
    reset: () => set({ ...blankNote }),
  };
};

const createDerivedNotes = () => {
  const newStore = derived(rawNotes, ($rawNotes) =>
    $rawNotes.noteOrder.map((id) => $rawNotes.notes[id])
  );

  return {
    ...newStore,
    addNote: rawNotes.addNote,
    updateNote: rawNotes.updateNote,
    removeNote: rawNotes.removeNote,
  };
};

const rawNotes = createNoteStore();
const notes = createDerivedNotes();
const currentNote = createCurrentNoteStore();

export { notes, currentNote };
