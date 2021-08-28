import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid_v4 } from "uuid";

type NotesState = {
  notes: {
    [key: string]: Note;
  };
  order: string[];
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

const initialNotesState: NotesState = {
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
  order: ["1", "2"],
  currentNote: undefined,
};

const notesReducer = createSlice({
  name: "notes",
  initialState: initialNotesState,
  reducers: {
    add: (state, action: PayloadAction<Note>) => {
      state.notes[action.payload.id] = action.payload;
      state.order.unshift(action.payload.id);
    },
    remove: (state, action: PayloadAction<Note>) => {
      // If we remove the current note, select a new note
      if (state.currentNote === action.payload.id) {
        state.currentNote = undefined;
      }

      state.order = state.order.filter((id) => id !== action.payload.id);
      delete state.notes[action.payload.id];
    },
    update: (state, action: PayloadAction<Note>) => {
      const note = action.payload.id
        ? action.payload
        : {
            ...action.payload,
            id: uuid_v4(),
          };

      // If this is a new note, make sure we add it to the order array.
      if (!state.notes[note.id]) {
        state.order.unshift(note.id);
      }

      state.notes[note.id] = note;
      state.currentNote = note.id;
    },
    setCurrent: (state, action: PayloadAction<Note>) => {
      state.currentNote = action.payload.id;
    },
    create: (state) => {
      state.currentNote = undefined;
    }
  },
});

const { add, remove, update, setCurrent, create } = notesReducer.actions;

const selectNotes = (state: NotesState) =>
  state.order.map((id) => state.notes[id]);

const selectCurrentNote = (state: NotesState) => {
  if (!state.currentNote) {
    return blankNote;
  }

  return state.notes[state.currentNote];
};

export {
  notesReducer as default,
  add,
  remove,
  update,
  create,
  setCurrent,
  selectNotes,
  selectCurrentNote,
};
