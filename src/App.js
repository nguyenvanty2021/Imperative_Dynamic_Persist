import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  lazy,
  Suspense,
} from "react";
import React from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { incrementCount } from "./redux/counterSlide";
// import ComponentA from "./components/A";
// import ComponentB from "./components/B";
// import ComponentC from "./components/C";
const ComponentA = lazy(() => import("./components/A"));
const ComponentB = lazy(() => import("./components/B"));
const ComponentC = lazy(() => import("./components/C"));
const Child = (props, ref) => {
  const [stateTest] = useState(false);
  const handleLog = () => console.log(stateTest);
  useImperativeHandle(ref, () => {
    return {
      stateTest,
      handleLog,
    };
  });
  return <div>Child</div>;
};
const ChildComp = forwardRef(Child);
function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state?.counterSlide?.count);
  const ref = useRef();
  return (
    <>
      <h3>Count: {count}</h3>
      <button onClick={() => dispatch(incrementCount(2))}>
        increate count
      </button>
      <button onClick={() => ref.current.handleLog()}>Check Func</button>
      <button onClick={() => console.log(ref.current.stateTest)}>
        Check State
      </button>
      <Suspense fallback={<div>Page is Loading...</div>}>
        <ComponentA />
        <ComponentB />
        <ComponentC />
      </Suspense>

      <ChildComp ref={ref} />
    </>
  );
}

export default App;
