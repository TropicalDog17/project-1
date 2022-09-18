import React from "react";
import { createRoot } from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import App from "./App";

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />}></Route>
        <Route path="login" element={<LoginPage />}></Route>
        {/* <Route index element={<Homepage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="edit/:articleId"
          element={<EditPage id={articleId} />}
        ></Route>
<Route path="add" element={<AddPage />}></Route> */}
      </Route>
    </Routes>
  </BrowserRouter>
);
