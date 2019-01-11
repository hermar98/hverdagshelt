// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { autocomplete, glob } from '../../../public/autocomplete';
import { municipalService } from '../../services';
import { history } from '../../index';

let municipalObjects;

export class ChooseMunicipalPage extends Component {

    render() {
        return (
            <div className="img-container">
                <form autoComplete="off">
                    <div className="autocomplete">
                        <input id="municipalInput" type="text" name="municipal" placeholder="Velg kommune"/>
                        <button value="" type="button" onClick={this.go}>Gå</button>
                    </div>
                </form>
                <img className="bg-image" src={"../../images/Trolltunga.jpg"} alt="Trolltunga"/>
            </div>
        );
    }
    mounted() {

        async function f () {

            municipalObjects = [];
            let promise = new Promise((resolve, reject) => {
                resolve(municipalService
                    .getMunicipals()
                    .then(municipals => municipalObjects = municipals));
            });

            let result = await promise;
            let municipals = result.map(e => e.name);

            autocomplete(document.getElementById("municipalInput"), municipals);
        }

        f();

    }

    async go() {
        let municipal = municipalObjects.find(e => e.name == glob);
        console.log(municipal);

        history.push('/municipal/' + municipal.mun_id);
    }
}
