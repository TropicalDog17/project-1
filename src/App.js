import * as React from "react";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { HomeLayout } from "./_components/HomeLayout";
import { ProtectedLayout } from "./_components/ProtectedLayout";
import ErrorPage from "./pages/ErrorPage";
import {
  LoginController,
  EditArticleController,
  ViewArticleController,
  ArticleGridController,
} from "./_components/controller";
// import ProfilePage from "./pages/Profile/ProfilePage";
export default function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<ArticleGridController />} />
        <Route path="/login" element={<LoginController />} />
        <Route path="/article/:articleId" element={<ViewArticleController />} />
        {/* <Route path="/profile" element={<ProfilePage />}/> */}
      </Route>
      <Route path="/article" element={<ProtectedLayout />}>
        <Route path="edit/:articleId" element={<EditArticleController />} />
        <Route path="add" element={<AddPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
