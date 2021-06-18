// https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript
// does not work for enums that assign value for each member
export function assertUnreachable(_x?: never): never {
  throw new Error("Didn't expect to get here");
}

export function cancelEvent(e: Event) {
  e.stopPropagation();
  return false;
}

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
export const coord = (p: Point2d) => `${p.x}, ${p.y}`;

export const svgLinePath = (a: Point2d, b: Point2d): string =>
  `M ${coord(a)} L ${coord(b)}`;

export const svgPolygonPoints = (...points: Point2d[]): string =>
  points.map(coord).join(" ");