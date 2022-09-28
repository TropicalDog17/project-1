import * as React from "react";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { HomeLayout } from "./_components/HomeLayout";
import { ProtectedLayout } from "./_components/ProtectedLayout";
import ErrorPage from "./pages/ErrorPage";
import ArticlePage from "./pages/ArticlePage";
import { LoginController } from "./_components/controller";
import { EditArticleController } from "./_components/controller/EditArticleController";
// import ProfilePage from "./pages/Profile/ProfilePage";
export default function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginController />} />
        <Route path="/article/:articleId" element={<ArticlePage />} />
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
