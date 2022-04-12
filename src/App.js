import React from "react";
import { Route } from "react-router-dom";
import JobsPage from "./pages/JobsPage";
import CompaniesPage from "./pages/CompaniesPage";
import CompanyPage from "./pages/SingleCompanyPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import NavBar from "./components/NavBar";

import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";


function App() {
  const auth = useSelector((store) => store);

  return (
    <>
      <NavBar />

      <div className="container pt-3">
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/jobs">
          {auth.isLoggedIn ? <JobsPage /> : <Redirect exact to="/" />}
        </Route>
        <Route exact path="/companies">
          {auth.isLoggedIn ? <CompaniesPage /> : <Redirect exact to="/" />}
        </Route>
        <Route exact path="/companies/:handle">
          {auth.isLoggedIn ? <CompanyPage /> : <Redirect exact to="/" />}
        </Route>
        <Route exact path="/login">
          {auth.isLoggedIn ? <Redirect exact to="/" /> : <LoginPage />}
        </Route>
        <Route exact path="/signup">
          {auth.isLoggedIn ? <Redirect exact to="/" /> : <SignUpPage />}
        </Route>
        <Route exact path="/profile">
          {auth.isLoggedIn ? <ProfilePage /> : <Redirect exact to="/" />}
        </Route>
      </div>
    </>
  );
}

export default App;
