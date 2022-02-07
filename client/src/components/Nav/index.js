import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="mx-1">
            <Link to="/orderHistory">Order History</Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">Signup</Link>
          </li>
          <li className="mx-1">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }
  }

  const styles = {
    title: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      // marginTop: "40px"
    },
    navBar: {
      display: "inline"
    },
  };

  return (
    <header className="flex-row px-1">
      <nav className="right">
        <div className="nav-wrapper">
          <Link className="brand-logo" to="/">
            Paddle
          </Link>
          <div className="right hide-on-med-and-down" style={styles.navBar}>
            {showNavigation()}
          </div>
        </div>
      </nav>
      {/* </nav> */}
    </header>
  );
}

export default Nav;
