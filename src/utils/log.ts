// TODO analytics
// TODO sentry

type EventParams = Record<string, string | number | undefined>;

export const logEvent = (name: string, params: EventParams = {}): void => {
  console.log("[EVENT]", name, params);
};

type ErrorParams = Record<string, unknown>;

export const logError = (
  name: string,
  e: Error,
  params: ErrorParams = {},
): void => {
  console.log("[ERROR]", name, e, params);
};
