import * as React from "react";
import { render } from "react-dom";

type State = {
  count: number;
};
type Increment = {
  readonly type: "increment";
  readonly incrementStep: number;
};
type Decrement = {
  readonly type: "decrement";
  readonly decrementStep: number;
};
type Double = {
  readonly type: "double";
  readonly doublingStep: number;
};

type Reset = {
  readonly type: "reset";
  readonly initialCount: number;
};

type Actions = Increment | Decrement | Double | Reset;

type Props = {
  incrementStep?: number;
  decrementStep?: number;
  doublingStep?: number;
  initialCount?: number;
};

const neverReached = (never: any) => {};
const resetState = (initialCount: number): State => ({
  count: initialCount
});
const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.incrementStep };
    case "decrement":
      return { count: state.count - action.decrementStep };
    case "double":
      return { count: state.count * action.doublingStep };
    case "reset":
      return { count: action.initialCount };
    default:
      neverReached(state);
  }
  return state;
};

// now that we have defined our reducer function, let's use Rect.useReducer

const Counter = ({
  incrementStep = 0,
  decrementStep = 0,
  doublingStep = 0,
  initialCount = 0
}: Props) => {
  const [state, dispatcher] = React.useReducer(
    reducer,
    initialCount,
    resetState
  );
  /**
  const [state, dispatch] = React.useReducer<React.Reducer<State, Actions>, number>(reducer, initialCount, resetState);
   */

  return (
    <div>
      <div>{state.count}</div>
      <button onClick={() => dispatcher({ type: "increment", incrementStep })}>
        Add {incrementStep}
      </button>
      <button onClick={() => dispatcher({ type: "decrement", decrementStep })}>
        Subtract {decrementStep}
      </button>
      <button onClick={() => dispatcher({ type: "double", doublingStep })}>
        Double
      </button>
      <button onClick={() => dispatcher({ type: "reset", initialCount })}>
        Reset
      </button>
    </div>
  );
};

const rootElement = document.getElementById("root");
render(
  <Counter
    incrementStep={1}
    decrementStep={2}
    doublingStep={2}
    initialCount={0}
  />,
  rootElement
);
