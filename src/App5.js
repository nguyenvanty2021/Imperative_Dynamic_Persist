import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import React from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { incrementCount } from "./redux/counterSlide";
import ComponentA1 from "./components/A1";
import ComponentB1 from "./components/B1";
import ComponentC1 from "./components/C1";
import ComponentD1 from "./components/D1";
// const ComponentA1 = lazy(() => import("./components/A1"));
// const ComponentB1 = lazy(() => import("./components/B1"));
// const ComponentC1 = lazy(() => import("./components/C1"));
// const ComponentD1 = lazy(() => import("./components/D1"));

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
function App5() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state?.counterSlide?.count);
  const ref = useRef();

  return (
    <>
      <div style={{ height: "1000px" }}>
        <h3>Count: {count}</h3>
        <button onClick={() => dispatch(incrementCount(2))}>
          increate count 123
        </button>
        <button onClick={() => ref.current.handleLog()}>Check Func</button>
        <button onClick={() => console.log(ref.current.stateTest)}>
          Check State 123
        </button>
      </div>

      <ComponentA1 />
      <ComponentB1 />
      <ComponentC1 />
      <ComponentD1 />
      <ChildComp ref={ref} />
    </>
  );
}

export default App5;
