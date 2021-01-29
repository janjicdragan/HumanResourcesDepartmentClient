import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("Your passwords do not match");
      setPassword("");
      setPasswordConfirm("");
    }

    const registerRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Email: email,
        Password: password,
        ConfirmPassword: passwordConfirm,
      }),
    };
    const response = await fetch(
      "https://localhost:44321/api/Account/Register",
      registerRequest
    );

    if (response.status === 200) {
      alert("You have registered successfully");
      setEmail("");
      setPassword("");
      document.getElementById("cancelReg").click();
    } else {
      alert("An error has occured:" + response.statusText);
      setEmail("");
      setPassword("");
      document.getElementById("cancelReg").click();
    }
  };
  return (
    <div>
      <form onSubmit={handleRegister} className="signForm">
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
        <div className="form-group">
          <label htmlFor="regPasswordRepeat">Confirm password:</label>
          <input
            type="password"
            id="regPasswordRepeat"
            placeholder="Confirm password"
            className="form-control"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-outline-success">
            Register
          </button>
          <button type="button" className="btn btn-outline-light">
            <Link to="/" id="cancelReg">
              Cancel
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
