// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, } from './widgets';
import Menu from './components/menu/Menu.js';
import { FileIssuePage } from "./components/pages/FileIssuePage";
import { LoginPage } from "./components/pages/LoginPage";
import { RegisterPage } from "./components/pages/RegisterPage";
import { ChooseMunicipalPage } from "./components/pages/ChooseMunicipalPage";

// Reload application when not in production environment

if (process.env.NODE_ENV !== 'production') {
  let script = document.createElement('script');
  script.src = '/reload/reload.js';
  if (document.body) document.body.appendChild(script);
}

import createHashHistory from 'history/createHashHistory';

export const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after
// successfully saving a student


const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
        <Route exact path="/" component={ChooseMunicipalPage} />
        <Route exact path="/registerUser" component={RegisterPage} />
        <Route exact path="/registerIssue" component={FileIssuePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/sendEmail" />
      </div>
    </HashRouter>,
    root
  );


