import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import notesReducer, {
  selectNotes as baseSelectNotes,
  selectCurrentNote as baseSelectCurrentNote,
} from "./notes";

const store = configureStore({
  reducer: {
    notes: notesReducer.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Global selectors
const selectNotes = (state: RootState) => baseSelectNotes(state.notes);
const selectCurrentNote = (state: RootState) =>
  baseSelectCurrentNote(state.notes);

export {
  store as default,
  useAppDispatch,
  useAppSelector,
  selectNotes,
  selectCurrentNote,
};

export {
  add as addNote,
  remove as removeNote,
  update as updateNote,
  create as createNote,
  setCurrent as setCurrentNote,
} from "./notes";
