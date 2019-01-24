import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { userService } from '../../services/UserService';
import { history } from '../../index';
import {Alert, Card} from '../../widgets';
import { tokenManager } from '../../tokenManager';
import LimitedRegistrationForm from '../forms/LimitedRegistrationForm';

export class ActivateAccountPage extends Component<{ match: { params: { tokenId: string } } }>{
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
        <div className="container">
          <Card className="mt-4" title="Aktivering av bruker">
            <div>
              En aktiveringslink ar blitt sendt til din epost-adresse.
            </div>
            </Card>
        </div>
      );
    }
  }

  mounted() {
    let token = tokenManager.getJwt();
    if(token){
      history.push('/profil');
    }

    userService.checkActivationToken(this.props.match.params.tokenId).then(user => {
      if (!user) return;
      if (user.rank !== 0) {
        this.isAdminCreated = true;
      } else {
        userService
          .activateAccount(this.props.match.params.tokenId)
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
