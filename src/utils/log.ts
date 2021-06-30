/* eslint-disable no-console */

import { captureException, addBreadcrumb, Severity } from "@sentry/react";
import { useAppState } from "../state/AppState";

type EventParams = Record<string, unknown>;

export const logEvent = (name: string, params: EventParams = {}): void => {
  addBreadcrumb({
    type: "app_event",
    message: name,
    level: Severity.Log,
    data: params,
  });

  if (window.gtag != null) {
    gtag("event", name, params);
  } else {
    console.log("[EVENT]", name, params);
  }
};

type ErrorParams = Record<string, unknown>;

export const getZustandState = (): Record<string, unknown> => {
  try {
    const state = useAppState.getState();
    return {
      selectedRectangleId: state.selectedRectangleId,
      rectangles: state.rectangles,
      borderSafeSpace: state.borderSafeSpace,
      pinkBackground: state.pinkBackground,
      renderSmooth: state.renderSmooth,
      image:
        state.image != null
          ? {
              isExample: state.image.isExample,
              width: state.image.data.width,
              height: state.image.data.height,
            }
          : null,
    };
  } catch (_e) {
    return {};
  }
};

export const logError = (
  name: string,
  e: Error,
  params: ErrorParams = {},
): void => {
  console.group(`[ERROR] ${name} : ${e.message}`);
  console.error("Params", params);
  console.error(e);
  console.groupEnd();

  captureException(e, {
    fingerprint: [name, e.message],
    extra: {
      ...getZustandState(),
      ...params,
      custom_error_name: name,
    },
    level: Severity.Error,
  });
};
