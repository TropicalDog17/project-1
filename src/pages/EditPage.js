import * as React from "react";
import { Outlet, useParams } from "react-router-dom";
import { EditArticleForm } from "../_components/view/EditArticle";
export default function EditPage() {
  let { articleId } = useParams();
  return <EditArticleForm articleId={articleId} />;
}
