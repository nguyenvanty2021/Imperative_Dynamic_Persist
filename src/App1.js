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
import ComponentA from "./components/A";
import ComponentB from "./components/B";
import ComponentC from "./components/C";
// const ComponentA1 = lazy(() => import("./components/A1"));
// const ComponentB1 = lazy(() => import("./components/B1"));
// const ComponentC1 = lazy(() => import("./components/C1"));
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
function App1() {
  const [status] = useState(false);
  const dispatch = useDispatch();
  const count = useSelector((state) => state?.counterSlide?.count);
  const ref = useRef();
  return (
    <>
      <h3>Count: {count}</h3>
      <button onClick={() => dispatch(incrementCount(2))}>
        increate count 123
      </button>
      <button onClick={() => ref.current.handleLog()}>Check Func</button>
      <button onClick={() => console.log(ref.current.stateTest)}>
        Check State 123
      </button>
      <ComponentA />
      <ComponentB />
      <ComponentC />

      <ChildComp ref={ref} />
    </>
  );
}

export default App1;
