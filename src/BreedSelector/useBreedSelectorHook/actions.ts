import { ActionTypes } from './types';
import { BreedImagesResponse } from './getBreedImages';

/* Actions */
interface BreedButtonClickedAction {
  type: typeof ActionTypes.BREED_BTN_CLICKED;
  payload: string;
}
interface FetchSuccessAction {
  type: typeof ActionTypes.FETCH_SUCCESS;
  payload: BreedImagesResponse;
}
interface FetchErrorAction {
  type: typeof ActionTypes.FETCH_ERROR;
  payload: string;
}

export type Action =
  | BreedButtonClickedAction
  | FetchSuccessAction
  | FetchErrorAction;

/* Action Creators */
export function sendBreedButtonClicked(breed: string): Action {
  return {
    type: ActionTypes.BREED_BTN_CLICKED,
    payload: breed
  };
}
export function sendSuccess(data: BreedImagesResponse): Action {
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
