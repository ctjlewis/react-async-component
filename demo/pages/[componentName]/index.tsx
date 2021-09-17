// import { useRouter } from 'next/router'
import { FC } from 'react';

// import { StatefulComponent } from '../../../dist/StatefulComponent';
import { StatefulComponent } from '../../../dist/StatefulComponent';

const Centered: FC = ({ children }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {children}
    </div>
  );
}

const ComponentDemo = () => {
  type State = { count: number };

  const updateState = async ({ count }: State) => {
    /**
     * Mutate the state.
     */
    count += 1;
    /**
     * If count < 4, trigger the update.
     */
    if (count < 4) {
      return {
        count,
      };
    }

    return null;
  };

  return (
    <Centered>
      <div className="w-full text-center">
        <div>
          <h3><code>StatefulComponent</code></h3>
          <StatefulComponent
            initialState={{ count: 0 }}
            updateState={({ count }) => (count <= 4 ? { count: count + 1 } : null)}
          >
            {({ count }) => <p>Count: <strong>{count}</strong></p>}
          </StatefulComponent>
        </div>
      </div>
    </Centered>
  );
};

export default ComponentDemo;