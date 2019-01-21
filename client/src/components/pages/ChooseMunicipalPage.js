// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { autocomplete, glob } from '../../../public/autocomplete';
import { municipalService } from '../../services/MunicipalService';
import { history } from '../../index';
import { Municipal } from '../../models/Municipal';
import { NewMenu } from '../../components/menu/NewMenu';
import { tokenManager } from "../../tokenManager";


let municipalObjects;
//TODO: fix input
export class ChooseMunicipalPage extends Component {
  munId = localStorage.getItem('munId');
  render() {
    return (
      <div>
        <div>
          <NewMenu />
        </div>
        <div className="img-container">
          <div className="fg-image">
              <img src={'../../images/hverdagshelt-logo-tekst-fix.svg'} alt='HverdagsHelt Logo' />
          </div>
          <form autoComplete="off">
            <div className="autocomplete">
              <input id="municipalInput" type="text" name="municipal" placeholder="Velg kommune" />
              <button value="" type="button" onClick={this.go}>
                Gå
              </button>
            </div>
          </form>
          <img className="bg-image" src={'../../images/Trolltunga.jpg'} alt="Trolltunga" />
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

      autocomplete(document.getElementById('municipalInput'), municipals);
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
    history.push('/login');
  }
}
