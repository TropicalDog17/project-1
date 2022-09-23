import { Fragment } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import CatImg from "../static/img/main.png";
export default function ErrorPage() {
  return (
    <Fragment>
      <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
        <div>
          <Image src={CatImg}></Image>
          <h1>404. Page not found</h1>
        </div>
        <Link to="/">Back to homepage</Link>
      </div>
    </Fragment>
  );
}
