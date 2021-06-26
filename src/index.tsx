import { h, render } from "preact";
import "preact/devtools";
import App from "./App";
import "./index.css";

// TODO add example images to repo, with example rectangles
// TODO sentry
// TODO analytics
// TODO normalizer
// TODO readme
// | favicon
// | package.json
// | index.html
// TODO local storage to save rectangles
// TODO minify

// TODO test on mobile, e.g. drag&drop, image select
// | mobile: hide address bar

const root = document.getElementById("root");

if (root) {
  render(<App />, root);
}
