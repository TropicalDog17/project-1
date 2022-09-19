import React from "react";
import { createRoot } from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { RecoilRoot } from "recoil";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>
);
