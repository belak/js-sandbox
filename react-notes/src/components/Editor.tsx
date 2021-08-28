import { ChangeEvent, useCallback, useState } from "react";
import { sanitize } from "dompurify";
import marked from "marked";

import {
  updateNote,
  selectCurrentNote,
  useAppDispatch,
  useAppSelector,
} from "../store";

import "./Editor.css";

function renderText(text: string) {
  return {
    __html: sanitize(marked(text)),
  };
}

function Editor() {
  const dispatch = useAppDispatch();
  const note = useAppSelector(selectCurrentNote);
  const [preview, setPreview] = useState(false);

  const titleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        updateNote({
          ...note,
          title: event.target.value,
        })
      );
    },
    [dispatch, note]
  );

  const editorOnChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(
        updateNote({
          ...note,
          content: event.target.value,
        })
      );
    },
    [note, dispatch]
  );

  return (
    <div id="Editor">
      <div className="metadata">
        <input value={note.title} onChange={titleOnChange} />
        <button onClick={() => setPreview(!preview)}>Toggle Preview</button>
      </div>
      {preview ? (
        <div dangerouslySetInnerHTML={renderText(note.content)}></div>
      ) : (
        <textarea value={note.content} onChange={editorOnChange}></textarea>
      )}
    </div>
  );
}

export default Editor;
