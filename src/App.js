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
// import ComponentA1 from "./components/A1";
// import ComponentB1 from "./components/B1";
// import ComponentC1 from "./components/C1";
const ComponentA1 = lazy(() => import("./components/A1"));
const ComponentB1 = lazy(() => import("./components/B1"));
const ComponentC1 = lazy(() => import("./components/C1"));
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
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const count = useSelector((state) => state?.counterSlide?.count);
  const ref = useRef();
  const refB = useRef(null);
  React.useEffect(() => {
    console.log(refB?.current);
    if (!refB?.current) {
      return;
    }
    console.log(refB);
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        if (entries[0].isIntersecting) {
          setStatus(true);
        }
      },
      { threshold: 1, root: null }
    );
    observer.observe(refB?.current); // ref element button dùng để check trong viewport
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refB?.current]);
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
      <Suspense fallback={<div>Page is Loading...</div>}>
        <ComponentA1 />
      </Suspense>
      <div ref={refB} id="B">
        123
      </div>
      <Suspense fallback={<div>Page is Loading...</div>}>
        {status ? (
          <>
            <ComponentB1 />
          </>
        ) : (
          <></>
        )}
      </Suspense>
      <Suspense fallback={<div>Page is Loading...</div>}>
        <ComponentC1 />
      </Suspense>
      <ChildComp ref={ref} />
    </>
  );
}

export default App;
