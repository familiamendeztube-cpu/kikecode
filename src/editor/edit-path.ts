/** Where a field lives in a template, e.g. ["content", "en", "hero", "title1"]. */
export type EditPath = (string | number)[];

/** Immutably set a deep value by path (creating object/array spines as needed). */
export function setByPath<T>(root: T, path: EditPath, value: unknown): T {
  if (path.length === 0) return value as T;
  const [head, ...rest] = path;
  const isIndex = typeof head === "number";
  const base: any = root ?? (isIndex ? [] : {});
  const clone: any = Array.isArray(base) ? [...base] : { ...base };
  clone[head as any] = rest.length === 0 ? value : setByPath(clone[head as any], rest, value);
  return clone as T;
}

export function getByPath(root: unknown, path: EditPath): unknown {
  return path.reduce<unknown>((acc, k) => (acc == null ? undefined : (acc as any)[k]), root);
}

/** Build an empty value shaped like an existing sample (for "Add item"). */
export function blankLike(sample: unknown): unknown {
  if (typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (Array.isArray(sample)) return [];
  if (sample && typeof sample === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(sample)) out[k] = blankLike(v);
    return out;
  }
  return "";
}
