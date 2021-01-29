import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./Context";

function LogInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { saveToken } = useContext(AppContext);

  const handleLogIn = async (e) => {
    e.preventDefault();

    await fetch("https://localhost:44321/Token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "grant_type=password&username=" + email + "&password=" + password,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        saveToken(res);
        setEmail("");
        setPassword("");
        document.getElementById("cancelLogIn").click();
      })
      .catch((er) => alert("An error has occured: " + er.message));
  };

  return (
    <div>
      <form onSubmit={handleLogIn} className="signForm">
        <div className="form-group">
          <label htmlFor="regEmail">Email adress:</label>
          <input
            type="text"
            id="regEmail"
            placeholder="Enter your email adress"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="regPassword">Password:</label>
          <input
            type="password"
            id="regPassword"
            placeholder="Enter your password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="signingBtns">
          <button type="submit" className="btn btn-outline-success">
            Log In
          </button>
          <button type="button" className="btn btn-outline-light">
            <Link to="/" id="cancelLogIn">
              Cancel
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}
export default LogInForm;
