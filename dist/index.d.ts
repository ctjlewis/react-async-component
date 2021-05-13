/// <reference types="react" />
import StatefulComponent from './StatefulComponent';
import StatefulConsumer from './StatefulConsumer';
import StatefulProvider from './StatefulProvider';
export { StatefulComponent, StatefulConsumer, StatefulProvider };
declare const _default: {
    StatefulComponent: typeof StatefulComponent;
    StatefulConsumer: <T>({ children, context }: import("./StatefulComponent/types").StatefulConsumerProps<T>) => JSX.Element;
    StatefulProvider: typeof StatefulProvider;
};
export default _default;
