import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import {userService} from "../../services/UserService";
import {history} from "../../index";
import {Alert} from "../../widgets";
import {tokenManager} from "../../tokenManager";
import Menu from "../menu/Menu";

export class ActivateAccountPage extends Component {
  isActivated: boolean = false;

  render() {
    return (
      <div>
      <Menu/>
        {this.isActivated ? <div>Brukeren din er nå aktivert, BRO!</div> : <div>Din bruker er ikke aktivert. Vennligst sjekk din epost for aktiverings-link.</div>}
      </div>
    );
  }

  mounted() {
    userService
      .activateAccount(window.location.hash.slice(11))
      .then(token => {
        tokenManager.addToken(token)
        this.isActivated = true;
      })
      .catch((error: Error) => {
        console.log(error)
      });
  }
}