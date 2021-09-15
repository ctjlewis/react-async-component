import { StatefulProviderProps } from "../types";
import { StatefulComponent } from '../StatefulComponent'

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