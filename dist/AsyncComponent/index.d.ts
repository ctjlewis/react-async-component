/**
 * @fileoverview
 * @see https://gist.github.com/bodokaiser/a6377f5cecf6344cd131dce97694a2ad
 *
 * The `AsyncComponent` is initialized with an `initialState` and refreshes
 * according to some `updateState` function until it reaches a final state.
 */
import { Component } from "react";
import { AsyncComponentProps, AsyncConsumerProps, AsyncProviderProps, AsyncState } from "./types";
export default class AsyncComponent<T = any, K = {}> extends Component<AsyncComponentProps<T, K>> {
    active: boolean;
    /**
     * Initialize the state to the initial state, loading: true, and set the
     * render callback.
     */
    state: AsyncState<T>;
    render(): import("react").ReactNode;
    /**
     * If the component is active and we have a state update, await it, then
     * re-render with the new state.
     */
    componentDidMount(): Promise<void>;
    /**
     * Do not schedule updates after the component has been unmounted.
     */
    componentWillUnmount(): void;
}
/**
 * Consume the `context` from a Provider of that context up the render tree.
 */
export declare const AsyncConsumer: <T>({ children, context }: AsyncConsumerProps<T>) => JSX.Element;
/**
 * The `AsyncProvider` makes a given `Context` available to components beneath
 * it in the render tree, and re-renders when the `Context` changes, which is
 * detected automatically.
 */
export declare class AsyncProvider<T> extends AsyncComponent<T, AsyncProviderProps<T>> {
    /**
     * Render the Provider and load it with the current state.
     */
    render(): JSX.Element;
}
