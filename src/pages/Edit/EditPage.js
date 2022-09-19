import * as React from "react";
import { Outlet, useParams } from "react-router-dom";
import { EditArticleForm } from "../../_components/ui/EditArticleForm";
export default function EditPage(props) {
  let { articleId } = useParams();
  return <EditArticleForm articleId={articleId} />;
}
