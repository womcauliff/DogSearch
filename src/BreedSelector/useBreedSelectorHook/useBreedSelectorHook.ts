import React, { useReducer, useEffect } from 'react';
import usePrevious from '../../utils/usePrevious';
import { ActionTypes, Status, Statuses } from './types';
import { Action, sendError, sendSuccess } from './actions';
import { getBreedImages } from './getBreedImages';
import { Breed } from '../../App/useAppHook/getAllBreeds';

/** PrevStatus will be `undefined` after first render. */
type PrevStatus = Status | undefined;

interface State {
  selectedBreed: string;
  imageURLs: string[];
  errorMessage: string;
  fsmStatus: Status;
}
const initialState: State = {
  selectedBreed: '',
  imageURLs: [],
  errorMessage: '',
  fsmStatus: Statuses.IDLE
};

/**
 * Reducer for the custom useBreedSelector Hook.
 * This reducer is written in finite-state-machine style: If the current state
 * accepts the current action, transition to a new state.
 * https://twitter.com/DavidKPiano/status/1171062893984526336
 */
function reducer(state: State, action: Action): State {
  switch (state.fsmStatus) {
    case Statuses.IDLE:
      switch (action.type) {
        case ActionTypes.BREED_BTN_CLICKED:
          return {
            ...state,
            selectedBreed: action.payload,
            fsmStatus: Statuses.PENDING
          };
      }
      break;
    case Statuses.PENDING:
      switch (action.type) {
        case ActionTypes.FETCH_SUCCESS:
          return {
            ...state,
            fsmStatus: Statuses.IDLE,
            imageURLs: action.payload.message
          };

        case ActionTypes.FETCH_ERROR:
          return {
            ...state,
            fsmStatus: Statuses.ERROR,
            errorMessage: action.payload
          };

        case ActionTypes.BREED_BTN_CLICKED:
          // intentionally ignore additional fetches while
          // the existing request is in-flight.
          return state;
      }
      break;
    case Statuses.ERROR:
      switch (action.type) {
        case ActionTypes.BREED_BTN_CLICKED:
          return {
            ...state,
            fsmStatus: Statuses.PENDING
          };
      }
      break;
  }
  throw new Error(
    `Action ${action.type} is not handled by ${state.fsmStatus} status`
  );
}

/**
 * Custom hook for the BreedSelector component.
 */
export function useBreedSelectorHook(
  breeds: Breed[]
): [State, React.Dispatch<Action>] {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );
  const { fsmStatus, selectedBreed } = state;
  const prevFSMStatus: PrevStatus = usePrevious<Status>(fsmStatus);

  /**
   * When the FiniteStateMachine transitions from one state to another state,
   * side-effects may be performed.
   */
  useFetchBreedImages(
    fsmStatus,
    prevFSMStatus,
    dispatch,
    breeds,
    selectedBreed
  );

  return [state, dispatch];
}

/** Fetch the data of image URLs for a selected dog breed. */
function useFetchBreedImages(
  fsmStatus: Status,
  prevFSMStatus: PrevStatus,
  dispatch: React.Dispatch<Action>,
  breeds: Breed[],
  selectedBreed: string
) {
  useEffect(() => {
    const fetchBreedImages = async () => {
      try {
        const selected = breeds.find(
          breed => breed.displayName === selectedBreed
        );
        if (!selected) throw new Error('Unknown Breed Selected');

        const response = await getBreedImages(selected.apiPath);
        dispatch(sendSuccess(response.data));
      } catch (error) {
        console.log(error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
        dispatch(sendError(error.message));
      }
    };
    if (
      (prevFSMStatus === Statuses.IDLE && fsmStatus === Statuses.PENDING) ||
      (prevFSMStatus === Statuses.ERROR && fsmStatus === Statuses.PENDING)
    ) {
      // Only run this side-effect if the finite state machine has transitioned
      // from these particular states.
      fetchBreedImages();
    }
  }, [prevFSMStatus, fsmStatus, breeds, selectedBreed, dispatch]);
}
