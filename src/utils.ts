// https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript
// does not work for enums that assign value for each member
export function assertUnreachable(_x?: never): never {
  throw new Error("Didn't expect to get here");
}
