// import { useRouter } from 'next/router'
import { FC } from 'react';

import TestComponentDev from '../../components/StatefulComponent';
import TestComponentProd from '../../../dist/StatefulComponent';
import { AsyncState } from '../../components/StatefulComponent/types';

const Row: FC = ({ children, ...props }) => {
  return (
    <div className="min-h-full min-w-full flex flex-1 flex-row justify-center items-center" {...props}>
      {children}
    </div>
  );
}

const Column: FC = ({ children, ...props }) => {
  return (
    <div className="min-h-full min-w-full flex flex-1 flex-col justify-center items-center" {...props}>
      {children}
    </div>
  );
}

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
  const displayCount = (state: State) => {
    return (
      <h3>State.count: {state.count}</h3>
    );
  }

  return (
    <Centered>
      <div className="w-full grid grid-cols-2 gap-8">
        <div className="grid grid-rows-2 gap-8 justify-items-center">
          <h1>Development</h1>
          <TestComponentDev
            initialState={initialState}
            updateState={updateState}
            render={displayCount}
          />
        </div>
        <div className="grid grid-rows-2 gap-8 justify-items-center">
          <h1>Production</h1>
          <TestComponentProd
            initialState={initialState}
            updateState={updateState}
            render={displayCount}
          />
        </div>
      </div>
    </Centered>
  );
};

export default ComponentDemo;