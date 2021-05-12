/**
 * @fileoverview
 * @see https://gist.github.com/bodokaiser/a6377f5cecf6344cd131dce97694a2ad
 *
 * The `StatefulComponent` is initialized with an `initialState` and refreshes
 * according to some `updateState` function until it reaches a final state.
 */

import { Component } from "react";
import { StatefulComponentProps, StatefulConsumerProps, StatefulProviderProps, AsyncState } from "./types";

export default class StatefulComponent<T = any, K = {}> extends Component<StatefulComponentProps<T,K>> {
  active = true;
  /**
   * Initialize the state to the initial state, loading: true, and set the
   * render callback.
   */
  state: AsyncState<T> = {
    ...this.props.initialState,
    loading: true,
    updateState: (update) => {
      if (this.active) {
        this.setState({
          ...update,
          loading: false
        });
      }
    },
  }
  render() {
    const { render } = this.props;
    if (!render) {
      return (<></>);
    };
    return render(this.state);
  }
  /**
   * If the component is active and we have a state update, await it, then
   * re-render with the new state.
   */
  async componentDidMount() {
    const { updateState } = this.props;
    if (this.active && updateState) {
      const runAgain = await updateState(this.state);
      if (runAgain) {
        await this.componentDidMount();
      }
    }
  }
  /**
   * Do not schedule updates after the component has been unmounted.
   */
  componentWillUnmount() {
    this.active = false;
  }
}
/**
 * Consume the `context` from a Provider of that context up the render tree.
 */
 export const StatefulConsumer = <T,>({
  children,
  context
}: StatefulConsumerProps<T>) => (
  <context.Consumer>{children}</context.Consumer>
);
/**
 * The `AsyncProvider` makes a given `Context` available to components beneath
 * it in the render tree, and re-renders when the `Context` changes, which is
 * detected automatically.
 */
export class StatefulProvider<T> extends StatefulComponent<T, StatefulProviderProps<T>> {
  /**
   * Render the Provider and load it with the current state.
   */
  render() {
    const { context, children } = this.props;
    return (
      <context.Provider value={this.state}>
        {children}
      </context.Provider>
    );
  }
}