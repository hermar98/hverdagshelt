// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Button } from '../../widgets';
import { history } from '../../index';
import { autocomplete } from '../../../public/autocomplete';

export class ChooseMunicipalPage extends Component {
    render() {
        return (
            <div className="img-container">
                <form autoComplete="off">
                    <div className="autocomplete">
                        <input id="municipalInput" type="text" name="municipal" placeholder="Velg kommune"/>
                        <button value="" type="submit">Gå</button>
                    </div>
                </form>
                <img className="bg-image" src={"../../images/Trolltunga.jpg"} alt="Trolltunga"/>
            </div>
        );
    }
    mounted() {
        var municipals = ["Trondheim", "Tromsø", "Meråker", "Stjørdal"]

        autocomplete(document.getElementById("municipalInput"), municipals)
    }
}
