import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { DataProvider } from "./Contexts/GlobalState";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DataProvider>
    <Router>
      <App />
    </Router>
  </DataProvider>
);
reportWebVitals();
