import { h, render } from "preact";
import "preact/devtools";
import App from "./App";
import "./index.css";

// TODO sentry
// TODO analytics
// TODO normalizer
// TODO favicon
// TODO github link

const root = document.getElementById("root");

if (root) {
  render(<App />, root);
}
