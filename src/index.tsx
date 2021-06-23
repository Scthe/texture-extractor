import { h, render } from "preact";
import "preact/devtools";
import App from "./App";
import "./index.css";

// TODO sentry
// TODO analytics
// TODO normalizer
// TODO font
// TODO favicon
// TODO theme - spacing etc.
// TODO github link
// https://www.npmjs.com/package/file-drop-element

const root = document.getElementById("root");

if (root) {
  render(<App />, root);
}
