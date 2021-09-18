/**
 * @fileoverview
 * @see https://gist.github.com/bodokaiser/a6377f5cecf6344cd131dce97694a2ad
 *
 * The `StatefulComponent` is initialized with an `initialState` and refreshes
 * according to some `updateState` function until it reaches a `null` state.
 */
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  StateTransition,
  StateTransitionTarget,
  StateUpdateHook,
  StatefulComponentProps,
} from '../types';

/**
 * Update the state, bind the update hook to it, and return it.
 */
const doUpdate = <T,>(
  state: StateTransition<T>,
  transitionTo: StateTransitionTarget<T>,
  setState: Dispatch<SetStateAction<StateTransition<T>>>,
  updateState: StateUpdateHook<T>,
) => {
  const stateUpdate: StateTransition<T> = {
    ...state,
    ...transitionTo,
    updateState,
    loading: false,
  };
  /**
   * Set and return the state.
   */
  setState(stateUpdate);
  return stateUpdate;
};

/**
 * Create a state machine. The state is initialized with the `initialState`,
 * then updated as a function of `updateState` until it reaches a `null` state.
 */
export const StatefulComponent = <T,>({
  initialState,
  nextState,
  children: render = () => <></>,
}: StatefulComponentProps<T>) => {
  /**
   * By default, the state update hook will just set the state once and then
   * stop.
   */
  const updateState: StateUpdateHook<T> = (transitionTo) => {
    doUpdate(state, transitionTo, setState, updateState);
    return null;
  };
  /**
   * The state is initialized to the `initialState`, with `loading: true`, and a
   * hook to update it dynamically.
   */
  const [state, setState] = useState<StateTransition<T>>({
    ...initialState,
    loading: true,
    /**
     * By default, the function will just call setState and note that it is no
     * longer loading.
     */
    updateState,
  });
  /**
   * The state is updated with the `nextState` if it exists, until the state is
   * final and `nextState(state)` returns `null`.
   */
  useEffect(() => {
    /**
     * Define a self-referential update function which triggers a new
     * render and binds itself to the new state.
     */
    const updateState: StateUpdateHook<T> = (transitionTo) => {
      return doUpdate(state, transitionTo, setState, updateState);
    };
    /**
     * Await the next state and update.
     */
    if (nextState) {
      (async () => {
        const stateUpdate = await nextState(state);
        if (stateUpdate !== null) {
          /**
           * Trigger the update.
           */
          updateState({
            ...state,
            ...stateUpdate,
          });
        }
      })();
    }
  }, [state, nextState]);
  /**
   * Render the component as a function of state.
   */
  return render(state);
};
