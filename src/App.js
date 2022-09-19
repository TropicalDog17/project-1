import * as React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./_components/ui/Navbar";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import EditPage from "./pages/Edit/EditPage";
import AddPage from "./pages/Add/AddPage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { HomeLayout } from "./_components/HomeLayout";
import { ProtectedLayout } from "./_components/ProtectedLayout";
import { RecoilRoot } from "recoil";
// import ProfilePage from "./pages/Profile/ProfilePage";
export default function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/profile" element={<ProfilePage />}/> */}
      </Route>
      {/* <Route path="/article" element={<ProtectedLayout />}>
        <Route path="edit/:articleId" element={<EditPage />} />
        <Route path="add" element={<AddPage />} />
      </Route> */}
      {/* <Route index element={<Homepage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="edit/:articleId"
          element={<EditPage id={articleId} />}
        ></Route>
<Route path="add" element={<AddPage />}></Route> */}
      {/* <Route path="*" element={<ErrorPage />} /> */}
    </Routes>
  );
}
