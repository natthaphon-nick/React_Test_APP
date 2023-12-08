import React, { Fragment, useEffect } from "react";
import {Link, useLocation} from 'react-router-dom'
const Header = () => {


  return (
    <Fragment>
      <nav class="navbar navbar-expand-lg nav-light">
        <div class="container">
          <a class="navbar-brand" href="/">
            {/* <img src={logo} style={{ width: "65px" }} alt="Logo" /> */}
            <label className="text-dark">LOGO</label>
          </a>

          <button class="navbar-toggler" type="button" >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="nav nav-pills">
              <li className="nav-item " >
                <Link className="nav-link" to="/Home">Home</Link >
              </li>
              <li className="nav-item ">
                <Link className="nav-link" to="/Item">Item</Link >
              </li>
              <li className="nav-item ">
                <Link className="nav-link" to="/Checkbill">Checkbil</Link >
              </li>
            </ul>
          </div>

          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li class="nav-item">
              <Link className="btn btn-outline-dark me-2" to="/Cart">Cart</Link >
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </Fragment>

  );
};

export default Header;