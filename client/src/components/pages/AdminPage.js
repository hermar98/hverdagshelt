import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models/User.js';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import RegistrationForm from '../../components/forms/RegistrationForm';
import { NewMenu } from '../menu/NewMenu';
import { userService } from '../../services/UserService.js';

export class AdminPage extends Component {
    users = [];
    filterRank = 0;
    sortDetails = {sortBy: 'userId', order: 'asc'};

    render() {
        return (
            <div>
                <NewMenu />
                <div className="card m-3">
                    <div className="card-body">
                        <h2 className="card-title">Administrer brukere</h2>
                        <Button.Success OnClick={() => console.log('d')}>Hei</Button.Success>
                        <div className="col-sm-3 my-3">
                            <select className="form-control" onChange={event => this.filterRank = event.target.value}>
                                <option value={0}>Alle typer brukere</option>
                                <option value={1}>Privatperson</option>
                                <option value={2}>Bedrift</option>
                                <option value={3}>Kommuneansatt</option>
                                <option value={4}>Admin</option>
                            </select>
                        </div>
                        <div className="col-sm-3 my-3">
                            <select className="form-control">
                                <option value={0}>Alle kommuner</option>
                                <option value={1}>Fredrikstad</option>
                                <option value={2}>Bedrift</option>
                                <option value={3}>Kommuneansatt</option>
                                <option value={4}>Admin</option>
                            </select>
                        </div>
                        <table className="table table-bordered table-hover">
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
                                </tr>
                            </thead>
                            <tbody>
                                {this.users.filter(user => {
                                    return user.rank == this.filterRank || this.filterRank == 0;
                                }).map(user => (
                                    <tr key={user.userId}>
                                        <th scope="row">{user.userId}</th>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{this.getRankName(user.rank)}</td>
                                        <td>{user.munId ? (user.munId) : (' - ')}</td>
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
        userService.getUsers()
            .then(users => this.users = users)
            .catch((error: Error) => Alert.danger(error.message));
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

    sort(field: string) {
        if (this.sortDetails.sortBy === field) {
            this.users.reverse();
            if (this.sortDetails.order === 'asc') {
                this.sortDetails.order = 'desc';
            } else if (this.sortDetails.order === 'desc') {
                this.sortDetails.order = 'asc';
            }
        } else {
            if (field === 'userId') {
                this.users.sort(function(a, b) {
                    return a.userId - b.userId;
                });
            } else if (field === 'firstName') {
                this.users.sort(function(a, b) {
                    return a.firstName.localeCompare(b.firstName);
                });
            } else if (field === 'lastName') {
                this.users.sort(function(a, b) {
                    return a.lastName.localeCompare(b.lastName);
                });
            } else if (field === 'email') {
                this.users.sort(function(a, b) {
                    return a.email.localeCompare(b.email);
                });
            } else if (field === 'rank') {
                this.users.sort(function(a, b) {
                    return a.rank - b.rank;
                });
            } else if (field === 'munId') {
                this.users.sort(function(a, b) {
                    return a.munId - b.munId;
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
}