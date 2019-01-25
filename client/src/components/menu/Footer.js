// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';


export class Footer extends Component {
  render() {
    return(
      <nav className="footer navbarnavbar-expand-sm bg-dark navbar-dark bt-0">
        <div className="footerText row justify-content-center">
            <div className="footerLineOne">
                <NavLink className="footerText" to={"/vilkår"}><u>Vilkår for bruk</u></NavLink> -
                <NavLink className="footerText" to="/statistikk"> <u>Statistikk</u></NavLink>
            </div>
            <div className="footerLineTwo">
                <b> Tlf:</b> 555-0199 -
                <b> Epost:</b> hverdagsheltas@gmail.com
            </div>
        </div>
      </nav>
    )
  }
}