// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';


export class Footer extends Component {
  render() {
    return(
      <nav className="footer navbarnavbar-expand-sm bg-dark navbar-dark bt-0">
        <div className="container-fluid">
          <div className="navbar-footer">
            <ul className="nav navbar-nav navbar-right" id="footer">
              <form className="form-inline">
                <NavLink id="footerText" to={"/vilkår"}>
                  <li>Vilkår for bruk</li>
                </NavLink>
                <NavLink id="footerText" to={"#"}>
                 <li>Tlf</li>
                </NavLink>
                <NavLink id="footerText" to={"#"}>
                  <li>Epost: hverdagsheltas@gmail.com</li>
                </NavLink>
                <NavLink id="footerText" to="/statistikk" >
                  <li>Statistikk</li>
                </NavLink>
              </form>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}