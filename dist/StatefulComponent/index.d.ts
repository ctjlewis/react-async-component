/**
 * @fileoverview
 * @see https://gist.github.com/bodokaiser/a6377f5cecf6344cd131dce97694a2ad
 *
 * The `StatefulComponent` is initialized with an `initialState` and refreshes
 * according to some `updateState` function until it reaches a final state.
 */
import { Component } from "react";
import { StatefulComponentProps, AsyncState } from "../types";
export default class StatefulComponent<T = any, K = {}> extends Component<StatefulComponentProps<T, K>> {
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
