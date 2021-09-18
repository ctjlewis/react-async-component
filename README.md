# Stateful Component

*Define components as pure state machines.*

### Demo

https://stateful-component.vercel.app/

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fctjlewis%2Fstateful-component&demo-title=Stateful%20Component%20Demo&demo-description=A%20demo%20of%20several%20state%20machines.&demo-url=https%3A%2F%2Fstateful-component.vercel.app%2F&demo-image=https%3A%2F%2Fi.imgur.com%2Fc7dJ6AU.png)

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
      <p>
        Count: <strong>{count}</strong>
      </p>
    </div>
  )}
</StatefulComponent>
```
