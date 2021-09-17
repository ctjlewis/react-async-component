import { ReactElement } from 'react';

/**
 * Any number of updated state fields, or null.
 */
export type StateTransitionTarget<T> = Partial<T> | null;
/**
 * A Promise which resolves to an `UpdatedState`.
 */
export type StateTransitionPromise<T> = Promise<StateTransitionTarget<T>>;
/**
 * A function which returns an updated version of the state, or `null`.
 */
export type StateTransitionHook<T> = (
  stateUpdate: StateTransition<T>,
) => StateTransitionTarget<T> | StateTransitionPromise<T>;
/*
 * Metadata added to async component state.
 */
export interface StateTransitionMetadata<T> {
  loading: boolean;
  transition: (state: StateTransitionTarget<T>) => T | null;
}
/**
 * The state with some metadata related to loading status.
 */
export type StateTransition<T> = T & StateTransitionMetadata<T>;
/**
 * The `AsyncStateMachine` accepts an initial state and a function to update the
 * state asynchronously.
 */
export interface StateMachine<T> {
  /**
   * The complete default state to initialize. If no `updateState` is provided,
   * the state will only update when manually updated.
   */
  initialState: T;
  /**
   * A function which provides state updates. Values will be shallow-merged into
   * the state by React's `setState`. If the function returns `null`, the state
   * will stop updating.
   */
  next?: StateTransitionHook<T>;
}
/**
 * Generate a component from the state.
 */
export interface StatefulComponentProps<T> extends StateMachine<T> {
  children?: (state: StateTransition<T>) => ReactElement;
}
