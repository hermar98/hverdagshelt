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
          <div className="fg-card">
            <div className="fg-grid">
              <div className="fg-logo">
                <div className="justify-content-center row">
                 <img className="fg-image" src={"../../images/hverdagshelt-logo-black.svg"}/>
                </div>
                <div className="justify-content-center row">
                HverdagsHelt
                </div>
              </div>
              <div className="fg-input">
                <div className="justify-content-center row">
                  <form className="munInputForm justify-content-center row" autoComplete="off">
                      <input id="municipalInput" type="text" name="municipal" placeholder="Velg kommune" />
                      <button  value="" type="button" onClick={this.go}>Gå</button>
                  </form>
                </div>
                <div>

                </div>
              </div>
              <div className="fg-content">
                <div className="justify-content-center row">
                  <h5>Information:</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel suscipit metus, eget condimentum velit. Vestibulum auctor tincidunt lectus. Integer nec dolor quis ligula convallis fringilla vel ac urna. Nunc vitae risus sagittis, accumsan augue vel, mattis ipsum. Suspendisse dignissim hendrerit suscipit.
                  </p>
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
