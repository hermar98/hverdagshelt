// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { autocomplete, glob } from '../../../public/autocomplete';
import { municipalService } from '../../services/MunicipalService';
import { history } from '../../index';
import { Municipal } from '../../models/Municipal';
import { NewMenu } from '../../components/menu/NewMenu';
import { tokenManager } from "../../tokenManager";
import { Card} from "../../widgets";


let municipalObjects;
//TODO: fix input
export class ChooseMunicipalPage extends Component {
  munId = localStorage.getItem('munId');
  render() {
    return (
      <div>
        <div className="bg-image"></div>
        <div>
          <NewMenu />
        </div>

        <div className="fg">
          <Card>
            <div className="fg-grid">
              <div className="fg-logo">
                <img src={"../../images/hverdagshelt-logo-lightblue.svg"}width='100px'/><p>HverdagsHelt</p>
              </div>
              <div className="fg-input autocomplete">
                <form autoComplete="off">
                  <div>
                    <input id="municipalInput" type="text" name="municipal" placeholder="Velg kommune" />
                    <button value="" type="button" onClick={this.go}>Gå</button>
                  </div>
                </form>
              </div>
          </div>
          </Card>
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
    history.push('/loggInn');
  }
}
