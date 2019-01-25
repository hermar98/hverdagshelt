// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import { autocomplete, glob } from '../../../public/autocomplete';
import { municipalService } from '../../services/MunicipalService';
import { history } from '../../index';
import { Municipal } from '../../models/Municipal';
import { tokenManager } from '../../tokenManager';
import { HoverButton } from '../issueViews/issueViews';

let municipalObjects;

export class ChooseMunicipalPage extends Component {
  // munId = localStorage.getItem('munId');
  render() {
    return (
      <div>
        <div className="bg-image" />
        <div className="col-lg-12">
          <div className="fg">
            <div className="fg-card">
              <div className="fg-grid">
                <div className="fg-logo">
                  <div className="justify-content-center row">
                    <img className="fg-image" src={'../../images/hverdagshelt-logo-black.svg'} />
                  </div>
                  <div className="justify-content-center row">HverdagsHelt</div>
                </div>
                <div className="fg-input">
                  <div className="justify-content-center row">
                    <div className="munInputForm justify-content-center row">
                      <form id="munInputForm-Form" autoComplete="off">
                        <input id="munInputForm-Input" type="text" name="municipal" placeholder="Velg kommune" />
                        <HoverButton id="munInputForm-Button" onclick={this.go} text="Gå" />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="fg-content">
                  <div className="justify-content-center row">
                    <h5>Informasjon: </h5>

                    <p>
                      Velkommen til HverdagsHelt, en side for alle hverdagshelter ute i Kommune-Norge.
                      På denne siden kan du legge inn feil og mangler på infrastruktur som din kommune har
                      ansvar for, og kommunene kan informere om hendelser som skjer i nær fremtid.
                      <br/>
                      <br/>
                      Kom i gang ved å søke etter en kommune i feltet ovenfor, og bli en hverdagshelt du også!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  mounted() {
    async function f() {
      municipalObjects = [];
      let promise = new Promise((resolve, reject) => {
        resolve(municipalService.getMunicipals().then((municipals: Municipal[]) => (municipalObjects = municipals)));
      });

      let result = await promise;
      let municipals = result.map(e => e.name);

      autocomplete(document.getElementById('munInputForm-Input'), municipals);
    }

    f();
  }

  async go() {
    //$FlowFixMe
    let municipalId = municipalObjects.find(e => e.name == glob).munId;
    if (municipalId) {
      localStorage.setItem('munId', municipalId.toString());
      history.push('/kommune/' + municipalId);
    }
  }

  logout() {
    tokenManager.deleteToken();
    history.push('/loggInn');
  }
}
