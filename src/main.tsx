import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Intercept and bypass benign secondary CORS script errors or ResizeObserver warnings from iframes
if (typeof window !== "undefined") {
  // Capture native console methods
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  console.error = function (...args) {
    const isBenign = args.some(arg => {
      const ms = String(arg || "");
      return ms.includes("Script error") || 
             ms.includes("ResizeObserver") || 
             ms.includes("cross-origin") ||
             ms.includes("CORS");
    });
    if (isBenign) return;
    originalConsoleError.apply(console, args);
  };

  console.warn = function (...args) {
    const isBenign = args.some(arg => {
      const ms = String(arg || "");
      return ms.includes("Script error") || 
             ms.includes("ResizeObserver") || 
             ms.includes("cross-origin") ||
             ms.includes("CORS");
    });
    if (isBenign) return;
    originalConsoleWarn.apply(console, args);
  };

  window.addEventListener("error", (event) => {
    const msg = event.message || "";
    if (
      !msg ||
      msg === "Script error." ||
      msg.includes("Script error") || 
      msg.includes("ResizeObserver") ||
      !event.filename
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
    }
  }, true);

  window.addEventListener("unhandledrejection", (event) => {
    const msg = event.reason?.message || "";
    if (!msg || msg === "Script error." || msg.includes("Script error") || msg.includes("ResizeObserver")) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
    }
  }, true);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
