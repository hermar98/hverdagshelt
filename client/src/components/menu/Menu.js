import * as React from 'react';
import {Component} from 'react-simplified';
import {NavBar} from '../../widgets';
import {tokenManager} from '../../tokenManager';
import {history} from '../../index';
import {userService} from '../../services/UserService';
import {UserMenu} from './UserMenu';
import {CompanyMenu} from './CompanyMenu';
import {MunEmployeeMenu} from './MunEmployeeMenu';
import {AdminMenu} from './AdminMenu';

export class Menu extends Component {
  user = null;

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
          <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'}>Hverdagshelt</NavBar.Brand>
          <NavBar.Button onClick={this.toLogin}>Logg Inn</NavBar.Button>
          <NavBar.Button onClick={this.toRegister}>Registrer Bruker</NavBar.Button>
        </NavBar>
      </div>
    );
  }
  toProfile() {
    history.push('/profil');
  }

  toFeed() {
    history.push('/feed');
  }

  toLogin() {
    history.push('/loggInn');
  }
  toRegister() {
    history.push('/registrer');
  }
  toLogout() {
    tokenManager.deleteToken();
    history.push('/');
  }
  toRegisterIssue() {
    history.push('/registrerSak');
  }
  toRegisterEvent() {
    history.push('/registrerEvent');
  }
  toMunEmployeeProfile() {
    history.push('/profil');
  }
  toMunEmployeeHome() {
    history.push('/kommune/' + localStorage.getItem('munId') + '/saker'); //TODO: ansatt hjemside
  }
  toCompanyEmployeeHome() {
    history.push('/saker');
  }
  toAdminHome() {
    history.push('/admin');
  }

  changeMunicipal() {
    localStorage.removeItem('munId');
    history.push('/');
  }
}
