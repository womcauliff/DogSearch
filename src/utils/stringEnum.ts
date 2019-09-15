/**
 * Utility function to create a K:V from a list of strings
 * [Source](https://basarat.gitbooks.io/typescript/docs/types/literal-types.html)
 */
export default function strEnum<T extends string>(
  o: Array<T>
): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}
