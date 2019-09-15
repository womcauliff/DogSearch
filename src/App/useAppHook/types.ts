import strEnum from '../../utils/stringEnum';

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
