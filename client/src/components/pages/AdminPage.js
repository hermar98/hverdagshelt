import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models/User.js';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import RegistrationForm from '../../components/forms/RegistrationForm';
import { IssueMenu } from '../menu/IssueMenu';
import { userService } from '../../services/UserService.js';
import { municipalService } from '../../services/MunicipalService.js';
import { ImageButton } from '../issueViews/issueViews.js';
import {tokenManager} from "../../tokenManager";
import {history} from '../../index.js';

export class AdminPage extends Component {
    userId = 0;

    municipals = [];
    userData = [];

    filterRank = 0;
    filterMun = 0;
    sortDetails = {sortBy: 'userId', order: 'asc'};

    render() {
        return (
            <div>
                <IssueMenu />
                <div className="card m-3">
                    <div className="card-body">
                        <h2 className="card-title">Administrer brukere</h2>
                        <div className="d-flex my-3">
                            <div className="col-sm-3">
                                <select className="form-control" onChange={event => this.filterRank = event.target.value}>
                                    <option value={0}>Alle typer brukere</option>
                                    <option value={1}>Privatperson</option>
                                    <option value={2}>Bedrift</option>
                                    <option value={3}>Kommuneansatt</option>
                                    <option value={4}>Admin</option>
                                </select>
                            </div>
                            <div className="col-sm-3">
                                <select className="form-control" onChange={event => this.filterMun = event.target.value}>
                                    <option value={0}>Alle kommuner</option>
                                    {this.municipals.map(mun => (
                                        <option value={mun.munId}>{mun.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <table className="table table-bordered">
                            <thead id="t-head">
                                <tr>
                                    <th scope="col" onClick={() => this.sort('userId')}>
                                        ID {this.getArrow('userId')}
                                    </th>
                                    <th scope="col" onClick={() => this.sort('firstName')}>
                                        Fornavn {this.getArrow('firstName')}
                                    </th>
                                    <th scope="col" onClick={() => this.sort('lastName')}>
                                        Etternavn {this.getArrow('lastName')}
                                    </th>
                                    <th scope="col" onClick={() => this.sort('email')}>
                                        E-post {this.getArrow('email')}
                                    </th>
                                    <th scope="col" onClick={() => this.sort('rank')}>
                                        Type bruker {this.getArrow('rank')}
                                    </th>
                                    <th scope="col" onClick={() => this.sort('munId')}>
                                        Kommune {this.getArrow('munId')}
                                    </th>
                                    <th scope="col"/>
                                </tr>
                            </thead>
                            <tbody>
                                {this.userData.filter(user => {
                                    return (user.rank == this.filterRank || this.filterRank == 0)
                                        && (user.munId == this.filterMun || this.filterMun == 0);
                                }).map(user => (
                                    <tr key={user.userId}>
                                        <th scope="row">{user.userId}</th>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.rankName}</td>
                                        <td>{user.munName}</td>
                                        {(user.userId === this.userId) ? (<div/>) : (
                                            <td>
                                                <ImageButton source="../../images/cog.png" onclick={() => this.editUser(user)}/>
                                                <ImageButton source="../../images/trashcan.png" onclick={() => this.deleteUser(user)}/>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    mounted() {
        municipalService.getMunicipals()
            .then(municipals => {
                this.municipals = municipals;
                userService.getUsers()
                    .then(users => this.userData = users.map(user => {
                        return {
                            userId: user.userId,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            rank : user.rank,
                            rankName: this.getRankName(user.rank),
                            munId: user.munId,
                            munName: this.getMunicipalName(user.munId)};
                    })).catch((error: Error) => Alert.danger(error.message));
            }).catch((error: Error) => console.log(error));

        userService
            .getToken()
            .then(() => {
                userService
                    .getUser(tokenManager.getUserId())
                    .then(user => {
                        this.userId = user.userId;
                    })
                    .catch((error: Error) => console.log(error));
            })
            .catch((error: Error) => console.log(error));
    }

    getRankName(rank: number): string {
        if (rank === 1) {
            return 'Privatperson';
        } else if (rank === 2) {
            return 'Bedrift';
        } else if (rank === 3) {
            return 'Kommuneansatt';
        } else if (rank === 4) {
            return 'Admin';
        }
    }

    getMunicipalName(munId: number) {
        let mun = this.municipals.filter(mun => mun.munId === munId);
        console.log(mun.length);
        if (mun.length === 1) {
            return mun[0].name;
        } else {
            return ' - ';
        }
    }

    sort(field: string) {
        if (this.sortDetails.sortBy === field) {
            this.userData.reverse();
            if (this.sortDetails.order === 'asc') {
                this.sortDetails.order = 'desc';
            } else if (this.sortDetails.order === 'desc') {
                this.sortDetails.order = 'asc';
            }
        } else {
            if (field === 'userId') {
                this.userData.sort(function(a, b) {
                    return a.userId - b.userId;
                });
            } else if (field === 'firstName') {
                this.userData.sort(function(a, b) {
                    return a.firstName.localeCompare(b.firstName);
                });
            } else if (field === 'lastName') {
                this.userData.sort(function(a, b) {
                    return a.lastName.localeCompare(b.lastName);
                });
            } else if (field === 'email') {
                this.userData.sort(function(a, b) {
                    return a.email.localeCompare(b.email);
                });
            } else if (field === 'rank') {
                this.userData.sort(function(a, b) {
                    return a.rankName.localeCompare(b.rankName);
                });
            } else if (field === 'munId') {
                this.userData.sort(function(a, b) {
                    return a.munName.localeCompare(b.munName);
                });
            }
            this.sortDetails.sortBy = field;
            this.sortDetails.order = 'asc';
        }
    }

    getArrow(field: string) {
        if (this.sortDetails.sortBy === field) {
            if (this.sortDetails.order === 'asc') {
                return <div className="float-right">▲</div>
            } else {
                return <div className="float-right">▼</div>
            }
        } else {
            return <div/>;
        }
    }

    editUser(user: User) {
        history.push('/admin/edit/' + user.userId);
    }

    deleteUser(user: User) {
        if (confirm('Er du sikker på at du vil slette denne brukeren?')) {
            user.rank = 0;
            let index = this.userData.indexOf(user);
            console.log(index);
            userService.updateUser(user)
                .then(() => {
                    this.userData.splice(index, 1);
                    Alert.success('Brukeren med ID ' + user.userId + ' ble slettet fra systemet.');
                }).catch((error: Error) => Alert.danger(error.message));
        }
    }
}

export class AdminEditPage extends Component<{match: {params: {userId: number}}}> {
    user = null;

    firstName = '';
    lastName = '';
    rank = 0;

    render() {
        if (!this.user) return null;

        return (
            <div>
                <IssueMenu/>
                <Card title="Rediger bruker">
                    <form ref={e => (this.form = e)} onSubmit={e => e.preventDefault()}>
                        <Form.Input
                            type="email"
                            label="E-post"
                            required
                            value={this.user.email}
                            readOnly
                        />
                        <Form.Input
                            type="text"
                            label="Fornavn"
                            onChange={event => (this.user.firstName = event.target.value)}
                            required
                            placeholder="Skriv inn fornavn"
                            value={this.user.firstName}
                        />
                        <Form.Input
                            type="text"
                            label="Etternavn"
                            onChange={event => (this.user.lastName = event.target.value)}
                            required
                            placeholder="Skriv inn etternavn"
                            value={this.user.lastName}
                        />
                        <div className="form-group row justify-content-center">
                            <div className="col-sm-4 col-sm-offset-4">
                                <label>Type bruker</label>
                                <select
                                    className="form-control"
                                    onChange={event => (this.user.rank = event.target.value)}
                                    value={this.user.rank}
                                >
                                    <option value={1}>Privatperson</option>
                                    <option value={2}>Bedrift</option>
                                    <option value={3}>Kommuneansatt</option>
                                    <option value={4}>Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className="container h-100">
                            <div className="row h-100 justify-content-center align-items-center">
                                <Button.Basic onClick={this.save}>Lagre endringer</Button.Basic>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
        );
    }

    mounted() {
        userService.getUser(this.props.match.params.userId)
            .then(user => this.user = user)
            .catch((error: Error) => Alert.danger(error.message));
    }

    save() {
        if (!this.form || !this.form.checkValidity()) {
            return;
        }

        userService.updateUser(this.user)
            .then(() => {
                Alert.success('Brukeren med ID ' + this.user.userId + ' ble oppdatert.');
                history.push('/admin');
            }).catch((error: Error) => Alert.danger(error.message));
    }
}