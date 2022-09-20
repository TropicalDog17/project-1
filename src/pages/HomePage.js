import * as React from "react";
import { ArticleGrid } from "../_components/ui/ArticleGrid";
import { PaginationComponent } from "../_components/ui/PaginationComponent";
export default function ArticlePage() {
  return (
    <React.Fragment>
      <ArticleGrid />
      <PaginationComponent />
    </React.Fragment>
  );
}
