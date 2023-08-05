import {
  Suspense,
  forwardRef,
  lazy,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./App.css";
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
  const ref = useRef();
  return (
    <>
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
