import "./App.css";
import EmployeeList from "./components/EmployeeList";
import Navbar from "./components/Navbar";
import SignUpForm from "./components/SignUpForm";
import LogInForm from "./components/LogInForm";
import Error from "./components/Error";
import FilterForm from "./components/FilterForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import AddForm from "./components/AddForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <div className="container">
            <FilterForm />
            <EmployeeList />
            <AddForm />
          </div>
        </Route>
        <Route path="/SignUp">
          <SignUpForm />
        </Route>
        <Route path="/LogIn">
          <LogInForm />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
