// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';


export class Footer extends Component {
  render() {
    return(
      <nav className="navbarnavbar-expand-sm bg-dark navbar-dark bt-0">
        <div className="container-fluid">
          <div className="navbar-footer">
            <ul className="nav navbar-nav navbar-right" id="footer">
              <form className="form-inline">
                <NavLink to={"/vilkår"}>
                  <li><a href="/vilkår" id="footerText">Vilkår for bruk</a></li>
                </NavLink>
                <NavLink to={"#"}>
                 <li><a id="footerText">Tlf:</a></li>
                </NavLink>
                <NavLink to={"#"}>
                  <li><a id="footerText">Epost: hverdagsheltas@gmail.com</a></li>
                </NavLink>
              </form>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}