import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';

import { Alert, NavBar, Form, Card, Button } from '../../../widgets';
import MenuLoggedIn from '../../../components/menu/Menu.js';
import ChangePasswordForm from '../../../components/forms/ChangePasswordForm';
import { userService } from '../../../services';
import { issueService } from '../../../services';
import { municipalService } from '../../../services';
import { autocomplete } from '../../../../public/autocomplete';
import { User } from '../../../models';
import { Issue } from '../../../models';
import { Municipal } from '../../../models';
//import styles from './ProfilePage.css';

export class AdminProfilePage extends Component {
  user: User = new User(0, '', '', '', 0, '', '');
  municipal: Municipal = new Municipal(0, '', '', '', 0);
  municipals: Municipal[] = [];

  mounted() {
    async function f() {
      let municipalObjects = [];
      let promise = new Promise((resolve, reject) => {
        resolve(municipalService.getMunicipals().then(municipals => (municipalObjects = municipals)));
      });

      let result = await promise;
      let municipals = result.map(e => e.name);

      autocomplete(document.getElementById('municipalInput'), municipals);
    }

    f();

    userService
      .getUser(1)
      .then(rows => {
        this.user = rows;
        this.state.isLoaded = true;
      })
      .catch(error => console.log(error));

    municipalService
      .getMunicipals()
      .then(rows => ((this.municipals = rows), (this.municipal = rows.find(mun => (mun.munId = this.user.munId)))))
      .catch(error => console.log(error));
  }

  handleChangeMunicipal(e: Object) {
    e.preventDefault();

    let json = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      rank: user.rank,
      salt: passwordData.salt,
      hash_str: passwordData.passwordHash,
      mun_id: user.mun_id
    };

    userService.updateUser(json);
  }

  render() {
    return (
      <div>
        <MenuLoggedIn />
        <Card title="Min Profil">
          <p>
            Navn: {this.user.firstName} {this.user.lastName}
          </p>
          <p>Email: {this.user.email}</p>
          <p>Hjemkommune: {this.municipal.name}</p>
          <br />
          <form autoComplete="off">
            <div className="autocomplete">
              <input
                id="municipalInput"
                type="text"
                name="municipal"
                onChange={event => (this.munId = event.target.value)}
              />
              <button value="" type="submit">
                Endre Kommune
              </button>
            </div>
          </form>
        </Card>
        <Card>
          <ChangePasswordForm />
        </Card>
      </div>
    );
  }
}
