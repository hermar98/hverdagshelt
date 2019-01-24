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
        <div className="container col-sm-12 col-lg-8">
          <Card className="mt-4" title="Aktivering av bruker">
            <p className="text-left">
              <b>Velkommen til Hverdagshelt!</b><br/><br/>

              Din bruker er aktivert! Du er nå logget inn, og kan begynne å utforske siden. Husk at som privatbruker kan du selv velge hvilke saker du vil ha på din feed, ved å velge kommuner på din profil. <i>Kanskje ta en titt innom Din Profil? </i>
              Denne finner du øverst i høyre hjørne.<br/><br/>

              <i>Hverdagshelt AS</i>
            </p>
          </Card>
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
        <div className="container col-sm-12 col-lg-8">
          <Card className="mt-4" title="Aktivering av bruker">
            <p className="text-left">
              <b>Velkommen til Hverdagshelt!</b><br/><br/>

              Kun et lite steg gjenstår før registreringen er komplett. For å bidra til økt sikkerhet for både våre brukere og ansatte krever vi at
              man må verifisere epost-adressen før brukeren kan tas i bruk. Dette gjøres svært enkelt:<b> En aktiveringslink har blitt sendt til din epost-adresse.</b> Vennligst sjekk din registrerte email, og følg den vedlagte lenken for å aktivere din bruker.<br/>
              For å kunne registrere saker (melde inn feil) hos en kommune må brukeren være aktivert.
            </p>
            <br/><br/><br/>
            <p className="font-italic">
              Hvis du allerede har aktivert din bruker og blir tatt hit ved innlogging, har din bruker blitt deaktivert. Deaktiveringen skyldes sannsynligvis opptreden som ikke er i tråd med våre vilkår.
               Vennligst les igjennom våre vilkår ved å trykke nederst på siden. Hvis du mener deaktiveren er en feiltakelse, vennligst ta kontakt med Hverdagshelt AS - kontaktinfo nederst på siden - for å få oppklart saken.<br/><br/>Hverdagshelt AS
            </p>
            </Card>
        </div>
      );
    }
  }

  mounted() {
    userService.checkActivationToken(this.props.match.params.tokenId).then(user => {
      if (!user){
        userService.getUser(tokenManager.getUserId())
          .then(user => {
            if(user.rank !== 0){
              this.isActivated = true;
            }else{
              this.isActivated = false;
            }
          })
          .catch(error => console.log(error));
        return;
      }
      if (user.rank !== 0) {
        this.isAdminCreated = true;
      } else {
        userService
          .activateAccount(this.props.match.params.tokenId)
          .then(token => {
            tokenManager.addToken(token);
            this.isActivated = true;
            window.location.reload();
          })
          .catch((error: Error) => {
            console.log(error);
          });
      }
    });
  }
}
