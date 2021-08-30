import { createStore, Store, useStore } from "vuex";
import { v4 as uuid_v4 } from "uuid";

export type Note = {
  id: string;
  title: string;
  content: string;
};

type StoreState = {
  notes: {
    [key: string]: Note;
  };
  noteOrder: string[];
  currentNote?: string;
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
  currentNote: undefined,
};

const store = createStore({
  state: initialState,
  getters: {
    notes: (state) => state.noteOrder.map((id) => state.notes[id]),
    currentNote: (state) => {
      if (!state.currentNote) {
        return blankNote;
      }

      return state.notes[state.currentNote];
    },
  },
  mutations: {
    addNote: (state, action: Note) => {
      state.notes[action.id] = action;
      state.noteOrder.unshift(action.id);
    },
    removeNote: (state, action: Note) => {
      // If we remove the current note, select a new note
      if (state.currentNote === action.id) {
        state.currentNote = undefined;
      }

      state.noteOrder = state.noteOrder.filter((id) => id !== action.id);
      delete state.notes[action.id];
    },
    updateNote: (state, action: Note) => {
      const note = action.id
        ? action
        : {
            ...action,
            id: uuid_v4(),
          };

      // If this is a new note, make sure we add it to the order array.
      if (!state.notes[note.id]) {
        state.noteOrder.unshift(note.id);
      }

      state.notes[note.id] = note;
      state.currentNote = note.id;
    },
    setCurrentNote: (state, action: Note) => {
      state.currentNote = action.id;
    },
    createNote: (state) => {
      state.currentNote = undefined;
    },
  },
});

const useAppStore = (): Store<StoreState> => useStore<StoreState>();

export { store as default, useAppStore };
