import * as React from "react";
import { Outlet } from "react-router-dom";
import ArticleGrid from "../_components/ArticleGrid";
import Navbar from "../_components/Navbar";
import PaginationComponent from "../_components/PaginationComponent";
export default function ArticlePage() {
  return (
    <React.Fragment>
      <ArticleGrid />
      <PaginationComponent />
    </React.Fragment>
  );
}
