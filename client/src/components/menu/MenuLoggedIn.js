import * as React from 'react';
import { Component } from 'react-simplified';
import { NavBar } from '../../widgets';

export class MenuLoggedIn extends Component {
    render() {
        return (
            <div>
                <NavBar>
                    <NavBar.Brand image="images/Trondheim_kommune.png">Trondheim Kommune</NavBar.Brand>
                    <NavBar.Link to="/events">Events/hendelser</NavBar.Link>
                    <NavBar.Link to="/issues">Innmeldinger</NavBar.Link>
                    <NavBar.Link to="/registerIssue">Registrer sak</NavBar.Link>
                    <NavBar.Logout to="/logout">Logg ut</NavBar.Logout>
                </NavBar>
            </div>
        )
    }
}