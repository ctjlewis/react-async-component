/**
 * @fileoverview
 * @see https://gist.github.com/bodokaiser/a6377f5cecf6344cd131dce97694a2ad
 *
 * The `StatefulComponent` is initialized with an `initialState` and refreshes
 * according to some `updateState` function until it reaches a `null` state.
 */
import {
  StateTransition,
  StateTransitionTarget,
  StatefulComponentProps,
} from '../types';
import { useEffect, useState } from 'react';
/**
 * Create a state machine. The state is initialized with the `initialState`,
 * then updated as a function of `updateState` until it reaches a `null` state.
 */
export const StatefulComponent = <T,>({
  initialState,
  next,
  children: render = () => <></>,
}: StatefulComponentProps<T>) => {
  const [state, setState] = useState<StateTransition<T>>({
    ...initialState,
    loading: true,
    /**
     * By default, the function will just call setState and note that it is no
     * longer loading.
     */
    transition: (transitionTo: StateTransitionTarget<T>) => {
      setState({
        ...state,
        ...transitionTo,
        loading: false,
      });

      return null;
    },
  });

  useEffect(() => {
    /**
     * Define a self-referential update function which triggers a new
     * render and binds itself to the new state.
     */
    const transition = (transitionTo: StateTransitionTarget<T>) => {
      if (transitionTo) {
        const nextState: StateTransition<T> = {
          ...state,
          ...transitionTo,
          transition,
          loading: false,
        };

        setState(nextState);
        return nextState;
      }

      return null;
    };

    if (next) {
      (async () => {
        const stateUpdate = await next(state);
        if (stateUpdate !== null) {
          /**
           * Trigger the update.
           */
          transition({
            ...state,
            ...stateUpdate,
          });
        }
      })();
    }
  }, [state, next]);

  return render(state);
};
