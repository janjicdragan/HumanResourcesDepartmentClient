import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./Context";

function Navbar() {
  const { token, deleteToken } = useContext(AppContext);

  return (
    <section>
      {token ? (
        <nav className="navbar navbar-dark bg-dark">
          <h2 className="navbar-brand">Human Resources Department</h2>
          <div>
            <h3 className="signedUser">Signed user: {token.userName}</h3>
            <button
              className="btn btn-outline-light"
              type="button"
              onClick={() => deleteToken()}
            >
              <Link to="/">Log out</Link>
            </button>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-dark bg-dark">
          <h2 className="navbar-brand">Human Resources Department</h2>
          <div>
            <button className="btn btn-outline-light" type="button">
              <Link to="/SignUp">Sign-Up</Link>
            </button>
            <button className="btn btn-outline-light" type="submit">
              <Link to="/LogIn">Log-In</Link>
            </button>
          </div>
        </nav>
      )}
    </section>
  );
}

export default Navbar;
