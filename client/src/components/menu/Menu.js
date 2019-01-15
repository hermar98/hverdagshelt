// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, NavBar, Form, Card, Button, DropdownHeader, DropdownFooter, DropdownDivider, DropdownItem} from '../../widgets';
import {userService} from '../../services.js';
import {tokenManager} from '../../tokenManager';
import {history} from "../../index";

export default class Menu extends Component {
    isLoggedIn = false;

    render() {
        return this.isLoggedIn ? (
            <NavBar>
                <NavBar.Brand image="images/Trondheim_kommune.png">Trondheim Kommune</NavBar.Brand>
                <NavBar.Link to="/events">Events/hendelser</NavBar.Link>
                <NavBar.Link to="/issues">Innmeldinger</NavBar.Link>
                <NavBar.Link to="/registerIssue">Registrer sak</NavBar.Link>
                <NavBar.Dropdown title={'Herman Ryen Martinsen'}>
                    <DropdownHeader>martinsenhr@gmail.com</DropdownHeader>
                    <DropdownFooter>Kommuneansatt</DropdownFooter>
                    <DropdownDivider/>
                    <DropdownItem onClick={this.toProfile}>Min profil</DropdownItem>
                    <DropdownItem onClick={this.logout}>Logg ut</DropdownItem>
                </NavBar.Dropdown>
            </NavBar>
            ) : (
            <NavBar>
                <NavBar.Brand image="images/Trondheim_kommune.png">Trondheim Kommune</NavBar.Brand>
                <NavBar.Link to="/login">Logg inn</NavBar.Link>
                <NavBar.Link to="/registerUser">Registrer bruker</NavBar.Link>
            </NavBar>
        );
    }

    mounted() {
        userService.getToken().then(token => {
            console.log(token);
            this.isLoggedIn = true;
        }).catch((error: Error) => console.log(error));
    }

    toProfile() {
        history.push('/profile');
    }

    logout() {
        tokenManager.deleteToken();
        history.push('/login');
    }
}
