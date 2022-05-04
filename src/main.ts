import "quill/dist/quill.snow.css";
import "./styles.css";

import Quill from "quill";
import QuillCursors from "quill-cursors";
import * as Y from "yjs";
import { QuillBinding } from "y-quill";
import { WebrtcProvider } from "y-webrtc";

Quill.register("modules/cursors", QuillCursors);

const toolbarOptions = [
  // @ts-ignore
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike"],
  // @ts-ignore
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
  // @ts-ignore
  [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
  ["link", "image", "video"],
  ["clean"],
];

const quill = new Quill(document.querySelector("#editor"), {
  modules: {
    cursors: true,
    toolbar: toolbarOptions,
    history: { userOnly: true },
  },
  placeholder: "Write here...",
  theme: "snow",
});

const ydoc = new Y.Doc();
const ytext = ydoc.getText("quill");
const provider = new WebrtcProvider("quilly-common-room", ydoc);
const binding = new QuillBinding(ytext, quill, provider.awareness);
