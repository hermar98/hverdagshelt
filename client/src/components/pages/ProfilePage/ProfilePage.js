// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import {UserProfilePage} from "./UserProfilePage";
import {AdminProfilePage} from "./AdminProfilePage";
import { userService } from '../../../services/UserService';
import {tokenManager} from '../../../tokenManager.js'
import { municipalService } from '../../../services/MunicipalService';
import { history } from '../../../index';
import {MunEmployeeProfilePage} from "./MunEmployeeProfilePage";
import {ContractorProfilePage} from "./ContractorProfilePage";


export default class ProfilePage extends Component {
  user = null;

  render() {
    if (this.user) {
      if (this.user.rank === 1) {
        return (
          <UserProfilePage/>
        );
      } else if (this.user.rank === 2) {
        return (
          <ContractorProfilePage/>
        );
      } else if (this.user.rank === 3) {
        return (
          <MunEmployeeProfilePage/>
        );
      } else if (this.user.rank === 4) {
        return (
            <AdminProfilePage/>
        );
      }
    }
      return (
        <div>
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