# Stateful Component
Define a component as a state machine.

## Parameters

### `initialState: State`
The initial state to use.

### `updateState: (State) => State | null`
Accepts state as an argument, returns a modified form or `null` (to stop transition).

### Children: `(State) => ReactElement`
Renders a component as a function of state.

## Example
```tsx
/**
 * This component transitions from { count: 0 } to { count: 5 }.
 */
<StatefulComponent
  initialState={{ count: 0 }}
  updateState={
    async ({ count }) => (
      count <= 4 ? { count: count + 1 } : null
    )
  }
>
  {({ count }) => <p>Count: <strong>{count}</strong></p>}
</StatefulComponent>
```