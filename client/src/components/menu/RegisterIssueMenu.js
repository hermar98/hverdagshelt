import * as React from 'react';
import { Component } from 'react-simplified';
import { NavBar, DropdownHeader, DropdownFooter, DropdownDivider, DropdownItem } from '../../widgets';
import { tokenManager } from '../../tokenManager';
import { history } from '../../index';
import { userService } from '../../services/UserService';

export class RegisterIssueMenu extends Component {
  user = null;

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
  }

  render() {
    if (this.user) {
      return (
        <NavBar>
          <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'}>Hverdagshelt</NavBar.Brand>
          <NavBar.Button className="focus" onClick={this.toRegisterIssue}>
            Registrer Sak
          </NavBar.Button>
          <NavBar.Button onClick={this.toFeed}>Min Feed</NavBar.Button>
          <NavBar.Dropdown title={this.user.firstName + ' ' + this.user.lastName}>
            <DropdownHeader>{this.user.email}</DropdownHeader>
            <DropdownFooter>Privatperson</DropdownFooter>
            <DropdownDivider />
            <DropdownItem onClick={this.toProfile}>Min profil</DropdownItem>
            <DropdownItem onClick={this.toLogout}>Logg ut</DropdownItem>
          </NavBar.Dropdown>
        </NavBar>
      );
    }
    return <div />;
  }
  toProfile() {
    history.push('/profil');
  }

  toFeed() {
    history.push('/feed');
  }

  toLogout() {
    tokenManager.deleteToken();
    history.push('/');
  }
  toRegisterIssue() {
    history.push('/registrerSak');
  }
}
