// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import {UserProfilePage} from "./UserProfilePage";
import {AdminProfilePage} from "./AdminProfilePage";
import { userService } from '../../../services/UserService';
import {tokenManager} from '../../../tokenManager.js'
import { municipalService } from '../../../services/MunicipalService';
import { history } from '../../../index';


export default class ProfilePage extends Component {
  user = null;

  render() {
    if (this.user) {
      if (this.user.rank === 1) {
        return (
          <div>
            <UserProfilePage/>
          </div>
        );
      } else if (this.user.rank === 2) {
        return (
          <div></div>
        );
      } else if (this.user.rank === 3) {
        return (
          <div></div>
        );
      } else if (this.user.rank === 4) {
        return (
          <div>
            <AdminProfilePage/>
          </div>
        );
      }
    }
    return(
      <div>
        {this.logout()}
      </div>
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
  }

  logout() {
    tokenManager.deleteToken();
    history.push('/');
  }
}