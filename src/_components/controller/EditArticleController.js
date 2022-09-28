import * as React from "react";
import { Outlet, useParams } from "react-router-dom";
import { EditArticleForm } from "";
export default function EditPage() {
  let { articleId } = useParams();
  return <EditArticle articleId={articleId} />;
}
