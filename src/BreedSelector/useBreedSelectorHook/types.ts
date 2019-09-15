import strEnum from '../../utils/stringEnum';

/** FiniteStateMachine Statuses */
export const Statuses = strEnum(['IDLE', 'PENDING', 'ERROR']);
/** FiniteStateMachine Status Type */
export type Status = keyof typeof Statuses;

/* ActionTypes */
export const ActionTypes = strEnum([
  'BREED_BTN_CLICKED',
  'FETCH_SUCCESS',
  'FETCH_ERROR'
]);
