import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
const App = lazy(() => import("./App"));
const App1 = lazy(() => import("./App1"));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<div>Page is Loading...</div>}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Switch>
              <Route path="/app">
                <App1 />
              </Route>
              <Route path="/">
                <App />
              </Route>
            </Switch>
          </PersistGate>
        </Provider>
      </Suspense>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
