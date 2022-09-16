import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import App from "./App";
import ArticlePage from "./routes/ArticlePage";
import ErrorPage from "./error-page";
import LoginPage from "./routes/LoginPage";
import EditPage from "./routes/EditPage";
import EditArticleForm from "./_components/EditArticleForm";
const container = document.querySelector("#root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<ArticlePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="edit" element={<EditPage />}>
          <Route index element={<ArticlePage />} />
          <Route path=":articleId" element={<EditArticleForm />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
