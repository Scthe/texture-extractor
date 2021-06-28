import { h, render } from "preact";
import "preact/devtools";
import App from "./App";
import "./index.css";

// TODO sentry
// TODO analytics
// TODO normalizer
// TODO readme
// TODO minify
// TODO test on mobile, e.g. drag&drop, image select

// | add example images to repo, with example rectangles
// | favicon
// | package.json
// | index.html
// | mobile: hide address bar
// | local storage to save rectangles

const root = document.getElementById("root");

if (root) {
  render(<App />, root);
}
