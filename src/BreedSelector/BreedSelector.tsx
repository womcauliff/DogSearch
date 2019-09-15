import React, { useReducer } from 'react';
import ButtonGrid from '../ButtonGrid';
import { Breed } from '../App/useAppHook/getAllBreeds';
import { ActionTypes, Status, Statuses } from './types';
import { Action, sendBreedButtonClicked } from './actions';

interface State {
  selectedBreed: string;
  fsmStatus: Status;
}
const initialState: State = {
  selectedBreed: '',
  fsmStatus: Statuses.IDLE
};
interface BreedSelectorProps {
  breeds: Breed[];
}

function reducer(state: State, action: Action): State {
  switch (state.fsmStatus) {
    case Statuses.IDLE:
      switch (action.type) {
        case ActionTypes.BREED_BTN_CLICKED:
          return { ...state, selectedBreed: action.payload };
      }
      break;
  }
  throw new Error(
    `Action ${action.type} is not handled by ${state.fsmStatus} status`
  );
}
const BreedSelector: React.FC<BreedSelectorProps> = props => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );
  const breedDisplayNames: string[] = props.breeds.map(
    breedObj => breedObj.displayName
  );

  return (
    <ButtonGrid
      elementList={breedDisplayNames}
      selectedElement={state.selectedBreed}
      totalElements={12}
      numColumns={4}
      perColumn={3}
      onElementClick={(displayName: string) => {
        console.log(displayName);
        dispatch(sendBreedButtonClicked(displayName));
      }}
    />
  );
};

export default BreedSelector;
