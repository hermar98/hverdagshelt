// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { BrowserRouter, HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, NavBar, Form, Card, Button } from './widgets';
import Menu from './components/menu/Menu.js';
import { FileIssuePage } from "./components/pages/FileIssuePage";
import { LoginPage } from "./components/pages/LoginPage";
import { RegisterPage } from "./components/pages/RegisterPage";
import { ChooseMunicipalPage } from "./components/pages/ChooseMunicipalPage";
import {RegisterEventPage} from "./components/pages/RegisterEventPage";
import {IssueLarge} from "./components/issueViews/issueViews";
import {Issue} from "models.js";

// Reload application when not in production environment

if (process.env.NODE_ENV !== 'production') {
  let script = document.createElement('script');
  script.src = '/reload/reload.js';
  if (document.body) document.body.appendChild(script);
}

import createHashHistory from 'history/createHashHistory';

export const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after
// successfully saving a student

var issueTest = new Issue("Hull i veien ved Gate 7", "Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg", 3, "04-02-2018");
var issuesTest = [
    new Issue("Hull i veien ved Gate 7" ,"", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg", 1,""),
    new Issue("Ødelagt bom ved broa" ,"", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg", 3,""),
    new Issue("Herverk på husveggen min" ,"", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg", 2,""),
    new Issue("Søppeltømmingsplanene fungerer ikke bra" ,"", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg", 2,""),
    new Issue("Hull i veien ved Gate 7" ,"", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg", 3,""),
    new Issue("Ødelagt bom ved broa" ,"", "https://i.imgur.com/nqTGipe.jpg", 3,""),
    new Issue("Herverk på husveggen min" ,"", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg", 2,""),
    new Issue("Søppeltømmingsplanene fungerer ikke bra" ,"", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg", 1,"")
]

class issueView extends Component {
  render () {
    return (
        <div className="issue-container">
          <IssueLarge issue={issueTest} />
        </div>
    )
  }
}

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
        <Route exact path="/" component={ChooseMunicipalPage} />
        <Route exact path="/issues" component={IssueLarge} />
        <Route exact path="/registerUser" component={RegisterPage} />
        <Route exact path="/registerIssue" component={FileIssuePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/sendEmail" />
        <Route exact path="/event/register" component={RegisterEventPage}/>
      </div>
    </HashRouter>,
    root
  );


