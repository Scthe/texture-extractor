// https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript
// does not work for enums that assign value for each member
export function assertUnreachable(_x?: never): never {
  throw new Error("Didn't expect to get here");
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