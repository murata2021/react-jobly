import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./HomePage.css";


const HomePage = () => {
    const username = useSelector((store) => store.username);

    let homePageForAnon=(<><Link className="btn btn-outline-primary mr-3" to="/login" role="button">
    Login
  </Link>
  <span className="divider"></span>
  <Link className="btn btn-outline-primary mr-3" to="/signup" role="button">
    Sign Up
  </Link></>)

    let content=username?<p>Hi {username}!</p>:homePageForAnon

    return (
    <>
      <div className="jumbotron d-flex align-items-center min-vh-100">
        <div className="container text-center"><h1 className="display-4">Jobly</h1>
          <p className="lead">All the jobs in one, convenient place.</p>
          <p>Welcome to your professional community</p>
          <p className="lead">
            {content}
          </p></div>
      </div>
    </>
  );
};

export default HomePage;
