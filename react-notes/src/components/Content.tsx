import "./Content.css";

import Sidebar from "./Sidebar";
import Editor from "./Editor";

function Content() {
  return (
    <div id="Content">
      <div className="container">
        <Sidebar />
        <Editor />
      </div>
    </div>
  );
}

export default Content;
