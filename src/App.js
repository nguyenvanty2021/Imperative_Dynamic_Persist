import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import "./App.css";
const Child = (props, ref) => {
  const [stateTest, setStateTest] = useState(false);
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
      <ChildComp ref={ref} />
    </>
  );
}

export default App;
