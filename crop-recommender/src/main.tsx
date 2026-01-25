import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { LanguageProvider } from "./i18n/LanguageContext";
import App from "./App";
import { store } from "./state/store";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </Provider>
  </React.StrictMode>
);