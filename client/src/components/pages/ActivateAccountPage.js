import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { userService } from '../../services/UserService';
import { history } from '../../index';
import { Alert } from '../../widgets';
import { tokenManager } from '../../tokenManager';
import { NotLoggedInMenu } from '../menu/NotLoggedInMenu';

export class ActivateAccountPage extends Component {
  render() {
    return (
      <div>
        <NotLoggedInMenu />
        <div>Brukeren er nå aktivert!</div>
      </div>
    );
  }

  mounted() {
    userService
      .activateAccount(window.location.hash.slice(11))
      .then(token => {
        tokenManager.addToken(token);
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}
