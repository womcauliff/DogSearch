/**
 * Utility function to create a K:V from a list of strings
 * [Source](https://basarat.gitbooks.io/typescript/docs/types/literal-types.html)
 */
function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

/** FiniteStateMachine Statuses */
export const Statuses = strEnum(['INITIAL', 'PENDING', 'ERROR', 'IDLE']);
/** FiniteStateMachine Status Type */
export type Status = keyof typeof Statuses;

/* ActionTypes */
export const ActionTypes = strEnum([
  'FETCH_INIT',
  'FETCH_SUCCESS',
  'FETCH_ERROR'
]);
