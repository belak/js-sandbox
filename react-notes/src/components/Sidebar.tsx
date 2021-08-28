import {
  selectNotes,
  setCurrentNote,
  createNote,
  useAppDispatch,
  useAppSelector,
  removeNote,
} from "../store";

import "./Sidebar.css";

function Sidebar() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectNotes);

  return (
    <div id="Sidebar">
      <button onClick={() => dispatch(createNote())}>New Note</button>
      <table className="notes-list">
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td onClick={() => dispatch(setCurrentNote(note))}>
                {note.title}
              </td>
              <td
                className="actions"
                onClick={() => dispatch(removeNote(note))}
              >
                [x]
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sidebar;
