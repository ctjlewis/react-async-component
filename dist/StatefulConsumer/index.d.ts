/// <reference types="react" />
import { StatefulConsumerProps } from '../StatefulComponent/types';
/**
 * Consume the `context` from a Provider of that context up the render tree.
 */
declare const StatefulConsumer: <T>({ children, context }: StatefulConsumerProps<T>) => JSX.Element;
export default StatefulConsumer;
