import * as React from "react";
import { Nav } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Outlet } from "react-router-dom";
import Article from "./_components/Article";
import ArticleGrid from "./_components/ArticleGrid";
import Navbar from "./_components/Navbar";
import PaginationComponent from "./_components/PaginationComponent";

export default function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
}
