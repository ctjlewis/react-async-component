import { StatefulConsumerProps } from '../StatefulComponent/types'

/**
 * Consume the `context` from a Provider of that context up the render tree.
 */
const StatefulConsumer = <T,>({
  children,
  context
}: StatefulConsumerProps<T>) => (
  <context.Consumer>{children}</context.Consumer>
);

export default StatefulConsumer;