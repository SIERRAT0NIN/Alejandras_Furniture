import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router } from "react-router-dom";
import RouterApp from "./components/Router";
import { AuthProvider } from "./components/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <NextUIProvider>
        <AuthProvider>
          <div>
            <RouterApp />
          </div>
        </AuthProvider>
      </NextUIProvider>
    </Router>
  </React.StrictMode>
);
