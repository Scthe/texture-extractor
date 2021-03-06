// https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript
// does not work for enums that assign value for each member
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function assertUnreachable(_x?: never): never {
  throw new Error("Didn't expect to get here");
}

export function cancelEvent(e: Event): boolean {
  e.stopPropagation();
  return false;
}

export const clamp = (x: number, minVal: number, maxVal: number): number =>
  Math.min(maxVal, Math.max(minVal, x));

export const add2d = (a: Point2d, b: Point2d): Point2d => ({
  x: a.x + b.x,
  y: a.y + b.y,
});

export const sub2d = (a: Point2d, b: Point2d): Point2d => ({
  x: a.x - b.x,
  y: a.y - b.y,
});

export const mul2d = (a: Point2d, b: number): Point2d => ({
  x: a.x * b,
  y: a.y * b,
});

export const midpoint2d = (a: Point2d, b: Point2d): Point2d => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
});

export const between2d = (a: Point2d, b: Point2d, fac: number): Point2d => ({
  x: a.x + (b.x - a.x) * fac,
  y: a.y + (b.y - a.y) * fac,
});

// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#path_commands
const coord = (p: Point2d): string => `${p.x}, ${p.y}`;

export const svgLinePath = (a: Point2d, b: Point2d): string =>
  `M ${coord(a)} L ${coord(b)}`;

export const svgPolygonPoints = (...points: Point2d[]): string =>
  points.map(coord).join(" ");

export const hexAsSvgColor = (v: string): string => `%23${v.substring(1)}`;

function assertSignal(signal: AbortSignal) {
  if (signal.aborted) throw new DOMException("AbortError", "AbortError");
}

export async function abortable<T>(
  signal: AbortSignal,
  promise: Promise<T>,
): Promise<T> {
  assertSignal(signal);
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      signal.addEventListener("abort", () =>
        reject(new DOMException("AbortError", "AbortError")),
      );
    }),
  ]);
}

export const ensurePointInsideImage = (
  p: Point2d,
  imageData: AppImageData,
  padding: number,
): void => {
  const { width, height } = imageData.data;
  p.x = clamp(p.x, padding, padding + width);
  p.y = clamp(p.y, padding, padding + height);
};

export const getFromArray = <T>(arr: T[], idx: number): T => {
  if (arr.length === 0) {
    throw new Error(
      `getFromArray received array of length 0. How can I select something from this?`,
    );
  }
  return arr[Math.abs(idx) % arr.length];
};
