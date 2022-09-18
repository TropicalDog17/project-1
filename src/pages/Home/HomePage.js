import * as React from "react";
import { Outlet } from "react-router-dom";
import { ArticleGrid } from "../../_components/ui/ArticleGrid";
import Navbar from "../../_components/ui/Navbar";
import { PaginationComponent } from "../../_components/ui/PaginationComponent";
export default function ArticlePage() {
  return (
    <React.Fragment>
      <ArticleGrid />
      <PaginationComponent />
    </React.Fragment>
  );
}
