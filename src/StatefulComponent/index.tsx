/**
 * @fileoverview
 * @see https://gist.github.com/bodokaiser/a6377f5cecf6344cd131dce97694a2ad
 *
 * The `StatefulComponent` is initialized with an `initialState` and refreshes
 * according to some `updateState` function until it reaches a final state.
 */

import { AsyncState, StatefulComponentProps } from '../types';
import { Component, useEffect, useState } from 'react';

export const StatefulComponentTest = <T, K>({
  initialState,
  updateState,
  render,
}: StatefulComponentProps<T, K>) => {
  const [state, setState] = useState<AsyncState<T>>({
    ...initialState,
    loading: true,
  });

  useEffect(() => {
    if (updateState) {
      (async () => {
        const stateUpdate = await updateState(state);
        if (stateUpdate !== null) {
          setState({
            ...state,
            ...stateUpdate,
            loading: false,
          });
        }
      })();
    }
  }, [state, updateState]);

  if (!render) {
    return <></>;
  }

  return render(state);
};

export class StatefulComponent<T = any, K = {}> extends Component<
  StatefulComponentProps<T, K>
> {
  active = true;
  /**
   * Initialize the state to the initial state, loading: true, and set the
   * render callback.
   */
  state: AsyncState<T> = {
    ...this.props.initialState,
    loading: true,
  };
  /**
   * A method that renders a component as a function of state.
   */
  render() {
    const { render, updateState } = this.props;

    if (!render) {
      return <></>;
    }

    if (this.active && updateState) {
      (async () => {
        const stateUpdate = await updateState(this.state);
        if (stateUpdate) {
          this.setState(stateUpdate);
        }
      })();
    }

    return render(this.state);
  }
  /**
   * Mark unmounted components as inactive (do not update).
   */
  componentWillUnmount() {
    this.active = false;
  }
}
