import { Context, ReactElement, ReactNode } from 'react';

/**
 * Metadata added to async component state.
 */
export interface AsyncStateMetadata {
  loading: boolean;
}
/**
 * The state with some metadata related to loading status.
 */
export type AsyncState<T> = T & AsyncStateMetadata;
/**
 * The updated state returned from `updateState`.
 */
export type UpdatedState<T> = Partial<T> | null;
/**
 * A Promise which resolves to an `UpdatedState`.
 */
export type UpdatedStatePromise<T> = Promise<UpdatedState<T>>;
/**
 * A function which returns an updated version of the state, or `null`.
 */
export type UpdateStateHook<T> = (
  stateUpdate: AsyncState<T>,
) => UpdatedState<T> | UpdatedStatePromise<T>;

/**
 * The `AsyncStateMachine` accepts an initial state and a function to update the
 * state asynchronously.
 */
export interface AsyncUpdate<T = any> {
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
  updateState?: UpdateStateHook<T>;
  /**
   * Generate a component from the state.
   */
  children?: (state: AsyncState<T>) => ReactElement;
}
/**
 * `AsyncProvider` requires a `context` to read, and a `updateState` function
 * to generate a new state when the context changes.
 */
export interface StatefulProviderProps<T> extends AsyncUpdate<T> {
  context: Context<AsyncState<T>>;
}
/**
 * `AsyncConsumer` requires a `context` to read.
 */
export interface StatefulConsumerProps<T> {
  children: (value: T) => ReactNode;
  context: Context<T>;
}
