import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div>
      <h1>This page doesn't exist</h1>
      <button className="btn btn-primary">
        <Link to="/">Back to home</Link>
      </button>
    </div>
  );
}

export default Error;
