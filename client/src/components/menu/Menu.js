// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, NavBar, Form, Card, Button, DropdownHeader, DropdownFooter, DropdownDivider, DropdownItem} from '../../widgets';
import {userService} from '../../services.js';
import {tokenManager} from '../../tokenManager';
import {history} from "../../index";

export default class Menu extends Component {
    user = null;
    munId = localStorage.getItem('munId');

    render() {
        return this.user ? (
            <NavBar>
                <NavBar.Brand image="images/Trondheim_kommune.png" to={'/municipal/' + this.munId}>Trondheim Kommune</NavBar.Brand>
                <NavBar.Link to={'/municipal/' + this.munId + '/events'}>Events/hendelser</NavBar.Link>
                <NavBar.Link to={'/municipal/' + this.munId + '/issues'}>Innmeldinger</NavBar.Link>
                <NavBar.Link to={'/municipal/' + this.munId + '/issues/fileIssue'}>Registrer sak</NavBar.Link>
                <NavBar.Dropdown title={this.user.firstName + ' ' + this.user.lastName}>
                    <DropdownHeader>{this.user.email}</DropdownHeader>
                    <DropdownFooter>{'Rank: ' + this.user.rank}</DropdownFooter>
                    <DropdownDivider/>
                    <DropdownItem onClick={this.toProfile}>Min profil</DropdownItem>
                    <DropdownItem onClick={this.logout}>Logg ut</DropdownItem>
                </NavBar.Dropdown>
            </NavBar>
            ) : (
            <NavBar>
                <NavBar.Brand image='images/Trondheim_kommune.png'>Trondheim Kommune</NavBar.Brand>
                <NavBar.Link to={'/municipal/' + this.munId + '/login'}>Logg inn</NavBar.Link>
                <NavBar.Link to={'/municipal/' + this.munId + '/register'}>Registrer bruker</NavBar.Link>
            </NavBar>
        );
    }

    mounted() {
        userService.getToken().then(() => {
            userService.getUser(tokenManager.getUserId())
                .then(user => this.user = user)
                .catch((error: Error) => console.log(error));
        }).catch((error: Error) => console.log(error));
    }

    toProfile() {
        history.push('/municipal/' + this.munId + '/profile');
    }

    logout() {
        tokenManager.deleteToken();
        history.push('/municipal/' + this.munId + '/login');
    }
}
