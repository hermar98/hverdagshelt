import * as React from 'react';
import { Component } from 'react-simplified';
import {DropdownDivider, DropdownFooter, DropdownHeader, DropdownItem, NavBar} from '../../widgets';
import {User} from '../../models.js';
import {history} from "../../index";
import {tokenManager} from "../../tokenManager";

export class MunicipalMenu extends Component<{user: User}> {
    munId = localStorage.getItem('munId');

    render() {
        return (
            <NavBar>
                <NavBar.Brand image="images/Trondheim_kommune.png" to={'/municipal/' + this.munId}>Trondheim Kommune</NavBar.Brand>
                <NavBar.Link to={'/municipal/' + this.munId + '/fileIssue'}>Registrer sak</NavBar.Link>
                <NavBar.Link to={'/municipal/' + this.munId + '/registerEvent'}>Registrer event</NavBar.Link>
                <NavBar.Dropdown title={this.props.user.firstName + ' ' + this.props.user.lastName}>
                    <DropdownHeader>{this.props.user.email}</DropdownHeader>
                    <DropdownFooter>Kommuneansatt</DropdownFooter>
                    <DropdownDivider/>
                    <DropdownItem onClick={this.toProfile}>Min profil</DropdownItem>
                    <DropdownItem onClick={this.logout}>Logg ut</DropdownItem>
                </NavBar.Dropdown>
            </NavBar>
        )
    }

    toProfile() {
        history.push('/municipal/' + this.munId + '/profile');
    }

    logout() {
        tokenManager.deleteToken();
        history.push('/municipal/' + this.munId + '/login');
    }
}