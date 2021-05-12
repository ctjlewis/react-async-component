# Stateful Component

This library exports a `StatefulComponent` which can be used to asynchronously
`await` some update and then refresh again, any number of times, until reaching
some final state.

```tsx
const ComponentDemo = () => {
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

  return (
    <StatefulComponent
      initialState={{ count: 0 }}
      updateState={updateState}
      render={({ count }: State) => <h3>State.count: {count}</h3>}
    />
  );
};
```
