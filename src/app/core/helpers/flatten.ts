export function flatten<T>(array: T[], depth?: number): Generator<T>;
export function flatten<T>(array: T[][], depth?: number): Generator<T>;
export function flatten<T>(array: T[][][], depth?: number): Generator<T>;
export function flatten<T>(array: T[][][][], depth?: number): Generator<T>;
export function flatten<T>(array: T[][][][][], depth?: number): Generator<T>;
export function flatten<T>(
  array: T[][][][][][][],
  depth?: number,
): Generator<T>;
export function flatten<T>(
  array: T[][][][][][][][],
  depth?: number,
): Generator<T>;
export function flatten<T>(
  array: T[][][][][][][][][],
  depth?: number,
): Generator<T>;
export function flatten<T>(
  array: T[][][][][][][][][][],
  depth?: number,
): Generator<T>;
export function flatten<T>(
  array: T[][][][][][][][][][][],
  depth?: number,
): Generator<T>;
export function* flatten<T>(array: T[], depth = Infinity): Generator<T> {
  if (depth === undefined) {
    depth = 1;
  }
  for (const item of array) {
    if (Array.isArray(item) && depth > 0) {
      yield* flatten(item, depth - 1);
    } else {
      yield item;
    }
  }
}

export function flattenToArray<T>(array: T[]) {
  return [...flatten(array)];
}
