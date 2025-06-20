import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import App from "./components/App";
import "./main.css";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
