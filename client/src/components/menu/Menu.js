import * as React from 'react';
import { Component } from 'react-simplified';
import { NavBar } from '../../widgets';
import { tokenManager } from '../../tokenManager';
import { history } from '../../index';
import { userService } from '../../services/UserService';
import { UserMenu } from './UserMenu';
import { CompanyMenu } from './CompanyMenu';
import { MunEmployeeMenu } from './MunEmployeeMenu';
import { AdminMenu } from './AdminMenu';

export class Menu extends Component {
  user = null;

  activeLogin = '';
  activeRegister = '';
  mounted() {
    userService
      .getCurrentUser()
      .then(user => {
        this.user = user;
      })
      .catch((error: Error) => console.log(error));
  }
  render() {
    if (this.user) {
      if (this.user.rank === 1) {
        return <UserMenu />;
      } else if (this.user.rank === 2) {
        return <CompanyMenu />;
      } else if (this.user.rank === 3) {
        return <MunEmployeeMenu />;
      } else if (this.user.rank === 4) {
        return <AdminMenu />;
      }
    }
    return (
      <div>
        <NavBar>
          <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'} onClick={this.toHome}>
            Hverdagshelt
          </NavBar.Brand>
          <NavBar.Button className={this.activeLogin} onClick={this.toLogin}>
            Logg Inn
          </NavBar.Button>
          <NavBar.Button className={this.activeRegister} onClick={this.toRegister}>
            Registrer Bruker
          </NavBar.Button>
        </NavBar>
      </div>
    );
  }

  toLogin() {
    history.push('/loggInn');
    this.activeLogin = 'btnfocus';
    this.activeRegister = '';
  }
  toRegister() {
    history.push('/registrer');
    this.activeRegister = 'btnfocus';
    this.activeLogin = '';
  }
  toHome() {
    this.activeRegister = '';
    this.activeLogin = '';
  }
}
