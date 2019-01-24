import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { userService } from '../../services/UserService';
import { history } from '../../index';
import { Alert } from '../../widgets';
import { tokenManager } from '../../tokenManager';
import LimitedRegistrationForm from '../forms/LimitedRegistrationForm';

export class ActivateAccountPage extends Component {
  isActivated: boolean = false;
  isAdminCreated: boolean = false;

  render() {
    if (this.isActivated) {
      return (
        <div>
          <div className="container justify-content-center">
            <h2>Aktivering av bruker</h2>
            <div>Brukeren din er nå aktivert, BRO!</div>
          </div>
        </div>
      );
    } else if (this.isAdminCreated) {
      return (
        <div>
          <LimitedRegistrationForm />
        </div>
      );
    } else {
      return (
        <div>
          <NotLoggedInMenu />
          <div className="container justify-content-center">
            <h2>Aktivering av bruker</h2>
            <div>
              Din bruker er ikke aktivert eller har blitt deaktivert. Vennligst sjekk din epost for aktiverings-link.
            </div>
          </div>
        </div>
      );
    }
  }

  mounted() {


    userService.checkActivationToken(window.location.hash.slice(11)).then(user => {
      if (!user) return;
      if (user.rank !== 0) {
        this.isAdminCreated = true;
      } else {
        userService
          .activateAccount(window.location.hash.slice(11))
          .then(token => {
            tokenManager.addToken(token);
            this.isActivated = true;
          })
          .catch((error: Error) => {
            console.log(error);
          });
      }
    });
  }
}
