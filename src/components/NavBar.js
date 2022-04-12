import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/JoblyLogo.PNG";
import storage from "../state/storage"

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { logoutSuccess } from "../state/authActions";

const NavBar = () => {
  const history = useHistory();
  const auth = useSelector((store) => store);
  const dispatch = useDispatch();

  const onClickLogout=async(event)=>{
      event.preventDefault();
      dispatch(logoutSuccess())
      storage.clear()
      // dispatch({type:"logout-success"})
      history.push("/")
  }

  return (
    <nav className="navbar navbar-expand navbar-light bg-light shadow-sm ">
      <div className="container">
        <Link className="navbar-brand" to="/" title="Home">
          {/* <img src={logo} alt="Jobly" width="60" /> */}
          <p style={{color:"#325ea8",fontFamily:"system-ui",fontSize:"40px",fontWeight:"bold"}}>Jobly</p>
        </Link>
        <ul className="navbar-nav">
          {!auth.isLoggedIn && (
            <>
              <Link className="nav-link " to="/signup" title="Sign Up">
                Sign Up
              </Link>
              <Link className="nav-link" to="/login" title="Login">
                Login
              </Link>
            </>
          )}

          {auth.isLoggedIn && (
            <>
            <Link className="nav-link " to="/companies" title="Sign Up">
                Companies
              </Link>
              <Link className="nav-link " to="/jobs" title="Sign Up">
                Jobs
              </Link>
              <Link className="nav-link" to={`/profile`}>
                My Profile
              </Link>
              <a
                href="/"
                className="nav-link"
                 onClick={onClickLogout}
              >
                Logout ({auth.username})
              </a>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
