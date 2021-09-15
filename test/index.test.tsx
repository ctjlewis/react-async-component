/**
 * @jest-environment jsdom
 */
// @ts-ignore
import * as ReactDOM from 'react-dom';
import { AsyncState, StatefulComponent } from '../dist';

type State = { count: number }
const updateState = async ({ count, updateState }: AsyncState<State>) => {
  /**
   * Trigger a state update.
   */
  count += 1;
  updateState({ count });
  /**
   * Indicate whether or not to transition to the next state.
   */
  return count < 4;
};

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <StatefulComponent
        initialState={{ count: 0 }}
        updateState={updateState}
        render={({ count }: State) => <h3>State.count: {count}</h3>}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
