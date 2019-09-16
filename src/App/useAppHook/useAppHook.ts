import { useReducer, useEffect } from 'react';
import { getAllBreeds, parseSuccessResponse, Breed } from './getAllBreeds';
import usePrevious from '../../utils/usePrevious';
import { ActionTypes, Status, Statuses } from './types';
import { Action, sendFetchInit, sendError, sendSuccess } from './actions';

const { ERROR, INITIAL, IDLE, PENDING } = Statuses;
const { FETCH_ERROR, FETCH_INIT, FETCH_SUCCESS } = ActionTypes;

/** PrevStatus will be `undefined` after first render. */
type PrevStatus = Status | undefined;

interface AppState {
  fsmStatus: Status;
  breeds: Breed[];
  errorMessage: string;
}
const initialState: AppState = {
  fsmStatus: INITIAL,
  breeds: [],
  errorMessage: ''
};

/**
 * Reducer for the custom useApp Hook.
 * This reducer is written in finite-state-machine style: If the current state
 * accepts the current action, transition to a new state.
 * https://twitter.com/DavidKPiano/status/1171062893984526336
 */
function reducer(state: AppState, action: Action): AppState {
  switch (state.fsmStatus) {
    case INITIAL:
      switch (action.type) {
        case FETCH_INIT:
          return {
            ...state,
            fsmStatus: PENDING
          };
      }
      break;
    case PENDING:
      switch (action.type) {
        case FETCH_SUCCESS:
          return {
            ...state,
            fsmStatus: IDLE,
            breeds: parseSuccessResponse(action.payload)
          };

        case FETCH_ERROR:
          return {
            ...state,
            fsmStatus: ERROR,
            errorMessage: action.payload
          };
      }
      break;
    case ERROR:
      switch (action.type) {
        case FETCH_INIT:
          return {
            ...state,
            fsmStatus: PENDING
          };
      }
      break;
  }
  throw new Error(
    `Action ${action.type} is not handled by ${state.fsmStatus} status`
  );
}

/**
 * Custom hook for the App component.
 */
export function useAppHook(): [AppState, React.Dispatch<Action>] {
  const [state, dispatch] = useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  );
  const { fsmStatus } = state;
  const prevFSMStatus: PrevStatus = usePrevious<Status>(fsmStatus);

  /**
   * When the FiniteStateMachine transitions from one state to another state,
   * side-effects may be performed.
   */
  useAutoTransitionOnMount(prevFSMStatus, fsmStatus, dispatch);
  useFetchAllBreeds(prevFSMStatus, fsmStatus, dispatch);

  return [state, dispatch];
}

/** After mounting, automatically begin request for API data. */
function useAutoTransitionOnMount(
  prevFSMStatus: PrevStatus,
  fsmStatus: Status,
  dispatch: React.Dispatch<Action>
) {
  useEffect(() => {
    if (prevFSMStatus === undefined && fsmStatus === INITIAL) {
      dispatch(sendFetchInit());
    }
  }, [prevFSMStatus, fsmStatus, dispatch]);
}

/** Fetch the data of all available dog breeds */
function useFetchAllBreeds(
  prevFSMStatus: PrevStatus,
  fsmStatus: Status,
  dispatch: React.Dispatch<Action>
) {
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await getAllBreeds();
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
      (prevFSMStatus === INITIAL && fsmStatus === PENDING) ||
      (prevFSMStatus === ERROR && fsmStatus === PENDING)
    ) {
      // Only run this side-effect if the statemachine transitioned from *these* particular states.
      fetchAll();
    }
  }, [prevFSMStatus, fsmStatus, dispatch]);
}
