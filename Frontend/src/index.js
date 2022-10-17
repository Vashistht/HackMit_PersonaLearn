import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //Comment out StrictMode to prevent double rendering
  <React.StrictMode> 
    <App />
  </React.StrictMode>
);