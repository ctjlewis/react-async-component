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
 * This component increases as you press a button.
 */
<StatefulComponent initialState={{ count: 0 }}>
  {({ count, transition }) => (
    <div>
      <button
        className="rounded-lg m-4 border-2 p-2"
        onClick={() => transition({ count: count + 1 })}
      >
        Click me
      </button>
      <p>Count: <strong>{count}</strong></p>
    </div>
  )}
</StatefulComponent>
```