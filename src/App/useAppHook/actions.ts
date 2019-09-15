import { ActionTypes } from './types';
import { AllBreedsResponse } from './getAllBreeds';

/* Actions */
interface FetchInitAction {
  type: typeof ActionTypes.FETCH_INIT;
}
interface FetchSuccessAction {
  type: typeof ActionTypes.FETCH_SUCCESS;
  payload: AllBreedsResponse;
}
interface FetchErrorAction {
  type: typeof ActionTypes.FETCH_ERROR;
  payload: string;
}
export type Action = FetchInitAction | FetchSuccessAction | FetchErrorAction;

/* Action Creators */
export function sendFetchInit(): Action {
  return {
    type: ActionTypes.FETCH_INIT
  };
}
export function sendSuccess(data: AllBreedsResponse): Action {
  return {
    type: ActionTypes.FETCH_SUCCESS,
    payload: data
  };
}
export function sendError(error: string): Action {
  return {
    type: ActionTypes.FETCH_ERROR,
    payload: error
  };
}
