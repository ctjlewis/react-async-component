// import { useRouter } from 'next/router'
import { FC } from 'react';

import { StatefulComponent } from '../../../dist/StatefulComponent';

const Centered: FC = ({ children }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {children}
    </div>
  );
}

const ComponentDemo = () => {
  type State = { count: number }
  
  const initialState: State = {
    count: 0
  };

  const updateState = async ({ count }: State) => {
    /**
     * Mutate the state.
     */
    count += 1;
    /**
     * If count < 4, trigger the update.
     */
    if (count < 4) {
      return { count };
    }
  };

  const displayCount = (state: State) => {
    return (
      <p>State.count: <strong>{state.count}</strong></p>
    );
  }

  return (
    <Centered>
      <div className="w-full text-center">
        <h3><code>StatefulComponent</code></h3>
        <StatefulComponent
          initialState={initialState}
          updateState={updateState}
          render={displayCount}
        />
      </div>
    </Centered>
  );
};

export default ComponentDemo;