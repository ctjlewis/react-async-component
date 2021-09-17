import { FC } from 'react';
import { StatefulComponent } from '../../../dist/StatefulComponent';
import { StatefulComponentProps } from '../../../dist/types';

const Centered: FC = ({ children }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {children}
    </div>
  );
}

interface CountState {
  count: number;
}

interface ChangeNumberProps<T> extends StatefulComponentProps<T>{
  operation: (number: number) => number;
}

const ChangeNumber: FC<ChangeNumberProps<CountState>> = ({ initialState, operation }) => (
  <StatefulComponent
    initialState={initialState}
    // next={
    //   ({ count }) => count <= 4 ? { count: count + 1 } : null
    // }
  >
    {({ count, transition }) => (
      <div>
        <button
          className="rounded-lg m-4 border-2 p-2"
          onClick={() => {
            transition({ count: operation(count) });
          }}
        >
          Click me
        </button>
        <p>Count: <strong>{count}</strong></p>
      </div>
    )}
  </StatefulComponent>
);

const ComponentDemo = () => {
  return (
    <Centered>
      <div className="w-full text-center grid grid-rows-3 gap-8">
        <div>
          <h3><code>Add 10</code></h3>
          <ChangeNumber initialState={{ count: 0 }} operation={(number) => number + 10} />
        </div>

        <div>
          <h3><code>Random</code></h3>
          <ChangeNumber initialState={{ count: 0 }} operation={(_) => Math.random()} />
        </div>

        <div>
          <h3><code>Square</code></h3>
          <ChangeNumber initialState={{ count: 2 }} operation={(number) => number ** 2} />
        </div>
      </div>
    </Centered>
  );
};

export default ComponentDemo;