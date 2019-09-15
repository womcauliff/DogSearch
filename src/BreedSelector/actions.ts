import { ActionTypes } from './types';

/* Actions */
interface BreedButtonClickedAction {
  type: typeof ActionTypes.BREED_BTN_CLICKED;
  payload: string;
}

export type Action = BreedButtonClickedAction;

/* Action Creators */
export function sendBreedButtonClicked(breed: string): Action {
  return {
    type: ActionTypes.BREED_BTN_CLICKED,
    payload: breed
  };
}
