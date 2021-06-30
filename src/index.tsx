import { h, render } from "preact";
import "preact/devtools";
import { init as sentryInit } from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import App from "./App";

import "normalize.css";
import "./index.css";
import { getZustandState } from "./utils/log";

// TODO try without debounce
// TODO minify
// TODO change algoritm to homography

sentryInit({
  dsn: "https://19fdec013a2a4656b513d8491d2edc96@o825934.ingest.sentry.io/5839727",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  release: `${import.meta.env.APP_NAME}@${import.meta.env.APP_VERSION}`,
  environment: import.meta.env.MODE,
  initialScope: {
    tags: {
      version: import.meta.env.APP_VERSION,
      environment: import.meta.env.MODE,
    },
  },
  beforeSend: (e) => {
    e.extra = e.extra || {};

    const state = getZustandState();
    Object.keys(state).forEach((k) => {
      if (e.extra![k] == null) {
        e.extra![k] = state[k];
      }
    });

    return e;
  },
});

const root = document.getElementById("root");

if (root) {
  render(<App />, root);
}
