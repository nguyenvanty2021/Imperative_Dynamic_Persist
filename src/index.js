import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import App1 from "./App1";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const App2 = lazy(() => import("./App2"));
const App3 = lazy(() => import("./App3"));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ul>
        <li>
          <Link to="/">Page A</Link>
        </li>
        <li>
          <Link to="/b">Page B</Link>
        </li>
        <li>
          <Link to="/c">Page C</Link>
        </li>
        <li>
          <Link to="/d">Page D</Link>
        </li>
      </ul>

      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Switch>
            <Route path="/b">
              <App1 />
            </Route>
            <Route path="/">
              <App />
            </Route>
          </Switch>
        </PersistGate>
      </Provider>

      <Suspense fallback={<div>Page is Loading...</div>}>
        <Switch>
          <Route path="/d">
            <App3 />
          </Route>
          <Route path="/c">
            <App2 />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
