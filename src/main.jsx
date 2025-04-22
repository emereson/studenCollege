import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HeroUIProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </HeroUIProvider>
  </React.StrictMode>
);
