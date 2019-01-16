// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, NavBar, Form, Card, Button, DropdownHeader, DropdownFooter, DropdownDivider, DropdownItem} from '../../widgets';
import {userService, municipalService} from '../../services.js';
import {tokenManager} from '../../tokenManager';
import {history} from "../../index";
import {UserMenu} from './UserMenu';
import {MunicipalMenu} from './MunicipalMenu';
import { Municipal } from '../../models';

export default class Menu extends Component {
    user = null;
    municipal = new Municipal();
    munId = localStorage.getItem('munId');

    render() {
        if (this.user) {
            if (this.user.rank === 1) {
                return <UserMenu user={this.user} municipal={this.municipal}/>;
            } else if (this.user.rank === 2) {
                return <MunicipalMenu user={this.user} municipal={this.municipal}/>
            }
        }
        return (
            <NavBar>
                <NavBar.Brand image={this.municipal.municipalShield}>{this.municipal.name + ' kommune'}</NavBar.Brand>
                <NavBar.Link to={'/municipal/' + this.munId + '/login'}>Logg inn</NavBar.Link>
                <NavBar.Link to={'/municipal/' + this.munId + '/register'}>Registrer bruker</NavBar.Link>
            </NavBar>
        );
    }

    mounted() {
        userService.getToken().then(() => {
            userService.getUser(tokenManager.getUserId())
                .then(user => {
                    this.user = user
                })
                .catch((error: Error) => console.log(error));
        }).catch((error: Error) => console.log(error));

        municipalService.getMunicipal(this.munId)
            .then(municipal => this.municipal = municipal)
            .catch((error: Error) => console.log(error));
    }
}
