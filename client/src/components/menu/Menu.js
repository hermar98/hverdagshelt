// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import {
  Alert,
  NavBar,
  Form,
  Card,
  Button,
  DropdownHeader,
  DropdownFooter,
  DropdownDivider,
  DropdownItem
} from '../../widgets';
import { userService, municipalService } from '../../services.js';
import { tokenManager } from '../../tokenManager';
import { history } from '../../index';
import { Municipal } from '../../models';

export default class Menu extends Component {
  user = null;
  municipal = new Municipal();
  munId = localStorage.getItem('munId');

  render() {
    if (this.user) {
      if (this.user.rank === 1) {
        return (
          <NavBar>
            <NavBar.Brand image={this.municipal.municipalShield} to={'/municipal/' + this.munId}>
              {this.municipal.name + ' kommune'}
            </NavBar.Brand>
            <NavBar.Link to={'/municipal/' + this.munId + '/fileIssue'}>Registrer sak</NavBar.Link>
            <NavBar.Dropdown title={this.user.firstName + ' ' + this.user.lastName}>
              <DropdownHeader>{this.user.email}</DropdownHeader>
              <DropdownFooter>Privatperson</DropdownFooter>
              <DropdownDivider />
              <DropdownItem onClick={this.toProfile}>Min profil</DropdownItem>
              <DropdownItem onClick={this.logout}>Logg ut</DropdownItem>
            </NavBar.Dropdown>
          </NavBar>
        );
      } else if (this.user.rank === 2) {
        return (
          <NavBar>
            <NavBar.Brand image={this.municipal.municipalShield} to={'/municipal/' + this.munId}>
              {this.municipal.name + ' kommune'}
            </NavBar.Brand>
            <NavBar.Link to={'/municipal/' + this.munId + '/fileIssue'}>Registrer sak</NavBar.Link>
            <NavBar.Link to={'/municipal/' + this.munId + '/registerEvent'}>Registrer event</NavBar.Link>
            <NavBar.Dropdown title={this.user.firstName + ' ' + this.user.lastName}>
              <DropdownHeader>{this.user.email}</DropdownHeader>
              <DropdownFooter>Kommuneansatt</DropdownFooter>
              <DropdownDivider />
              <DropdownItem onClick={this.toProfile}>Min profil</DropdownItem>
              <DropdownItem onClick={this.logout}>Logg ut</DropdownItem>
            </NavBar.Dropdown>
          </NavBar>
        );
      }
    }
    return (
      <NavBar>
        <NavBar.Brand image={this.municipal.municipalShield}>{this.municipal.name + ' kommune'}</NavBar.Brand>
        <NavBar.Link to={'/municipal/' + this.munId + '/login'}>Logg inn</NavBar.Link>
        <NavBar.Link to={'/municipal/' + this.munId + '/register'}>Registrer bruker</NavBar.Link>
      </NavBar>
    );
  }

  mounted() {
    userService
      .getToken()
      .then(() => {
        userService
          .getUser(tokenManager.getUserId())
          .then(user => {
            this.user = user;
          })
          .catch((error: Error) => console.log(error));
      })
      .catch((error: Error) => console.log(error));

    municipalService
      .getMunicipal(this.munId)
      .then(municipal => (this.municipal = municipal))
      .catch((error: Error) => console.log(error));
  }

  toProfile() {
    history.push('/municipal/' + this.munId + '/profile');
  }

  logout() {
    tokenManager.deleteToken();
    history.push('/municipal/' + this.munId + '/login');
  }
}
