/**
 * Deep-compare two JSON-compatible values and return true if there are any changes.
 *
 * Behavior:
 * - Accepts any JSON-compatible value (primitives, arrays, plain objects, null).
 * - Returns true when the two inputs are different (any deep difference).
 * - Returns false when they are deeply equal.
 *
 * Note: This is intended for JSON-like structures. It treats `undefined` as a value
 * (so { a: undefined } !== {}), and does not attempt to handle functions, DOM nodes,
 * or prototypes specially.
 */
export function compareJsonObjects(
  a: unknown,
  b: unknown,
  exclude?: string | string[]
): boolean {
  const excludeArr = Array.isArray(exclude)
    ? exclude
    : exclude
    ? [exclude]
    : [];
  const excludeSet = new Set<string>(excludeArr);
  return !deepEqual(a, b, excludeSet);
}

function deepEqual(a: unknown, b: unknown, exclude: Set<string>): boolean {
  // Fast path for strict equality (covers primitives and identical references)
  if (a === b) return true;

  // Handle NaN (NaN !== NaN but should be considered equal for JSON numeric comparison)
  if (typeof a === "number" && typeof b === "number") {
    if (Number.isNaN(a) && Number.isNaN(b)) return true;
  }

  // Handle null explicitly (typeof null === 'object')
  if (a === null || b === null) return a === b;

  // Arrays
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i], exclude)) return false;
    }
    return true;
  }

  // Objects (plain objects)
  if (isObject(a) && isObject(b)) {
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    // Filter keys by exclude set so excluded keys are ignored even if present on one side only
    const aKeys = Object.keys(aObj).filter((k) => !exclude.has(k));
    const bKeys = Object.keys(bObj).filter((k) => !exclude.has(k));
    if (aKeys.length !== bKeys.length) return false;
    // Ensure same set of keys
    for (const key of aKeys) {
      if (!Object.prototype.hasOwnProperty.call(bObj, key)) return false;
      if (!deepEqual(aObj[key], bObj[key], exclude)) return false;
    }
    return true;
  }

  // Fallback: not strictly equal and not both objects/arrays => different
  return false;
}

function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

export default compareJsonObjects;
