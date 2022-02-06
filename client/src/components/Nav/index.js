import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/profile">
              Profile
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
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
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
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
      
    }
  }

  return (
    <header className="flex-row px-1">
      {/* <h1> */}
      {/* </h1> */}

      <nav className='right'>
      {/* <nav> */}
    <div className="nav-wrapper" style={styles.navBar}>
        <Link className ='brand-logo valign-wrapper' to="/">
          <img src='images/bid.png' />
           Paddle
           
        </Link>
      {/* <a href="#" class="brand-logo">Logo</a> */}
      {/* <ul id="nav-mobile" class="right hide-on-med-and-down"> */}
        {/* <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">JavaScript</a></li> */}
      {/* </ul> */}
        <div className='right hide-on-med-and-down'>{showNavigation()}</div>
    </div>
  </nav>
      {/* </nav> */}
    </header>
  );
}

export default Nav;
