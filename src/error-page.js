import { useRouteError } from "react-router-dom";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
export default function ErrorPage() {
  return (
    <div id="error-page">
      <h1>Oops</h1>
      <p>Sorry, an unexpected error has occurred</p>
    </div>
  );
}
