/**
 * @fileoverview
 * @see https://gist.github.com/bodokaiser/a6377f5cecf6344cd131dce97694a2ad
 *
 * The `StatefulComponent` is initialized with an `initialState` and refreshes
 * according to some `updateState` function until it reaches a `null` state.
 */
import { AsyncState, AsyncUpdate } from '../types';
import { useEffect, useState } from 'react';
/**
 * Create a state machine. The state is initialized with the `initialState`,
 * then updated as a function of `updateState` until it reaches a `null` state.
 */
export const StatefulComponent = <T,>({
  initialState,
  updateState,
  children,
}: AsyncUpdate<T>) => {
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

  if (!children) {
    return <></>;
  }

  return children(state);
};

// export class StatefulComponent<T = any, K = {}> extends Component<
//   StatefulComponentProps<T, K>
// > {
//   active = true;
//   /**
//    * Initialize the state to the initial state, loading: true, and set the
//    * render callback.
//    */
//   state: AsyncState<T> = {
//     ...this.props.initialState,
//     loading: true,
//   };
//   /**
//    * A method that renders a component as a function of state.
//    */
//   render() {
//     const { render, updateState } = this.props;

//     if (!render) {
//       return <></>;
//     }

//     if (this.active && updateState) {
//       (async () => {
//         const stateUpdate = await updateState(this.state);
//         if (stateUpdate) {
//           this.setState(stateUpdate);
//         }
//       })();
//     }

//     return render(this.state);
//   }
//   /**
//    * Mark unmounted components as inactive (do not update).
//    */
//   componentWillUnmount() {
//     this.active = false;
//   }
// }
