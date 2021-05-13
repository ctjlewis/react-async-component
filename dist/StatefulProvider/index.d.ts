/// <reference types="react" />
import { StatefulProviderProps } from "../types";
import StatefulComponent from '../StatefulComponent';
/**
 * The `AsyncProvider` makes a given `Context` available to components beneath
 * it in the render tree, and re-renders when the `Context` changes, which is
 * detected automatically.
 */
declare class StatefulProvider<T> extends StatefulComponent<T, StatefulProviderProps<T>> {
    /**
     * Render the Provider and load it with the current state.
     */
    render(): JSX.Element;
}
export default StatefulProvider;
