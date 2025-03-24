import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Find the container element
const container =
  document.getElementById("honey-hole-root") || document.getElementById("root");

// Only mount the app if the container exists
if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
