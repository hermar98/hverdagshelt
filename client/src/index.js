// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { BrowserRouter, HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, NavBar, Form, Card, Button } from './widgets';
import Menu from './components/menu/Menu';
import { FileIssuePage } from './components/pages/FileIssuePage';
import { LoginPage } from './components/pages/LoginPage';
import { UserProfilePage } from './components/pages/ProfilePage/UserProfilePage';
import { AdminProfilePage } from './components/pages/ProfilePage/AdminProfilePage';
import { RegisterPage } from './components/pages/RegisterPage';
import { EventPage, EventInfo } from './components/pages/EventPage';
import { ChooseMunicipalPage } from './components/pages/ChooseMunicipalPage';
import { RegisterEventPage } from './components/pages/RegisterEventPage';
import { IssuePage } from './components/pages/IssuePage';
import { IssueLarge, IssueOverviewNormal, IssueNormal, IssueOverviewSmall } from './components/issueViews/issueViews';
import { ForgotPassword } from './components/pages/ForgotPassword.js';
import { NewPasswordPage } from './components/pages/NewPasswordPage.js';
import { UploadImageTest } from './components/image/UploadImageTest.js';

import { MunicipalPage } from './components/pages/MunicipalPage';
import { Issue } from './models/Issue.js';

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
          <!-- Hverdagshelt sider -->
          <!-- TODO: Header, footer  -->
          <Route exact path="/" component={ChooseMunicipalPage} /> <!-- Forside  -->

          <Route exact path="/login" component={LoginPage} /> <!-- Innloggingsside -->

          <Route exact path="/register" component={RegisterPage} /> <!-- Registreringsside -->

          <Route exact path="/glemtPassord" component={ForgotPassword} /> <!-- Glemt passord -->

          <Route exact path="/glemtPassord/reset" component={NewPasswordPage} /> <!-- Resett passord -->

          <!-- TODO: Småfiks på profilsiden  -->
          <Route exact path="/profil" component={UserProfilePage} /> <!-- Profilside -->

          <!-- TODO: Få inn saker og events fra valgte kommuner -->
          <Route exact path="/feed" component={} /> <!-- Din feed -->

          <!-- TODO: Legg til kart  -->
          <Route exact path="/registrerSak" component={FileIssuePage} /> <!-- Registrer sak -->

          <!-- TODO: Bedriftsbruker skal kun se saker han er tildelt  -->
          <Route exact path="/bedrift" component={} /> <!-- Bedriftsbruker feed -->

          <!-- TODO: Alle privilegier, liste over alle brukere, legge/fjerne til kommuneansatte + bedriftsansatte  -->
          <Route exact path="/admin" component={} /> <!-- Administratorside -->

          <!-- TODO: Alt av statistikk  -->
          <Route exact path="/statistikk" component={} /> <!-- Statistikk -->

          <!-- Kommunesider -->
          <!-- TODO: Hjemmeside for kommunen  -->
          <Route exact path="/kommune/:munId" component={MunicipalPage} /> <!-- Hjemmeside -->

          <!-- TODO: Vis alle saker i en kommune  -->
          <Route exact path="/kommune/:munId/sak" component={IssuePage} /> <!-- Saker (for kommuneansatt?) -->

          <!-- TODO: Viser en spesifikk sak i en kommune  -->
          <Route exact path="/kommune/:munId/sak/:issueId" component={IssueLarge} /> <!-- Spesifikk sak -->

          <!-- TODO: Vis alle events i en kommune  -->
          <Route exact path="/kommune/:munId/hendelse" component={EventPage} /> <!-- Events -->

          <!-- TODO: Viser en spesifikk sak i en kommune  -->
          <Route exact path="/kommune/:munId/hendelse/:eventId" component={EventInfo} /> <!-- Events -->

          <!-- TODO: Kommuneansatt sin side. Vis alle saker for godkjenning  -->
          <Route exact path="/kommune/:munId/ansatt" component={} /> <!-- Ansattside -->
      </div>
    </HashRouter>,
    root
  );

