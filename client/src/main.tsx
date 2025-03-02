import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./app.css";
import { BrowserRouter } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.ts";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </PersistGate>,
);
