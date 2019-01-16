import * as React from 'react';
import { Component } from 'react-simplified';
import {DropdownDivider, DropdownFooter, DropdownHeader, DropdownItem, NavBar} from '../../widgets';
import {User} from "../../models";
import {history} from "../../index";
import {tokenManager} from "../../tokenManager";

export class UserMenu extends Component<{user: User, municipal: Municipal}> {
    munId = localStorage.getItem('munId');

    render() {
        return (
            <NavBar>
                <NavBar.Brand image={municipal.municipalShield} to={'/municipal/' + this.munId}>{municipal.name + ' kommune'}</NavBar.Brand>
                <NavBar.Link to={'/municipal/' + this.munId + '/fileIssue'}>Registrer sak</NavBar.Link>
                <NavBar.Dropdown title={this.props.user.firstName + ' ' + this.props.user.lastName}>
                    <DropdownHeader>{this.props.user.email}</DropdownHeader>
                    <DropdownFooter>Privatperson</DropdownFooter>
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