// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { autocomplete, glob } from '../../../public/autocomplete';
import { municipalService } from '../../services';
import { history } from '../../index';
import { Municipal } from '../../models';

let municipalObjects;
//TODO: fix input
export class ChooseMunicipalPage extends Component {
  munId = localStorage.getItem('munId');
  render() {
    return (
      <div className="img-container">
        <div className="bg-text">
          <h1>Hverdagshelt</h1>
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
    );
  }
  mounted() {
    if (this.munId) {
      history.push('/municipal/' + this.munId);
    }
    async function f() {
      municipalObjects = [];
      let promise = new Promise((resolve, reject) => {
        resolve(municipalService.getMunicipals().then((municipals: Municipal) => (municipalObjects = municipals)));
      });

      let result = await promise;
      let municipals = result.map(e => e.name);

      autocomplete(document.getElementById('municipalInput'), municipals);
    }

    f();
  }

  async go() {
    //$FlowFixMe
    let municipal = municipalObjects.find(e => e.name == glob).munId;
    if (municipal) {
      localStorage.setItem('munId', municipal.toString());
      history.push('/municipal/' + municipal);
    }
  }
}
