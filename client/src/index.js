// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { BrowserRouter, HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, NavBar, Form, Card, Button } from './widgets';
import Menu from './components/menu/Menu';
import { Footer } from './components/menu/Footer';
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
import { TermsOfService } from './components/pages/TermsOfServicePage.js';
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
        <Route exact path="/" component={ChooseMunicipalPage} /> <!-- Forside  -->
        <Route exact path="/login" component={LoginPage} /> <!-- Innloggingsside -->
        <Route exact path="/register" component={RegisterPage} /> <!-- Registreringsside -->
        <Route exact path="/glemtPassord" component={ForgotPassword} /> <!-- Glemt passord -->
        <Route exact path="/glemtPassord/reset" component={NewPasswordPage} /> <!-- Resett passord -->
        <Route exact path="/vilkår" component={TermsOfService} /> <!-- Vilkår for bruk -->
        <Route exact path="/profil" component={UserProfilePage} /> <!-- Profilside -->
        <Route exact path="/feed" component={} /> <!-- Din feed -->
        <Route exact path="/registrerSak" component={FileIssuePage} /> <!-- Registrer sak -->
        <Route exact path="/bedrift" component={} /> <!-- Bedriftsbruker feed -->
        <Route exact path="/admin" component={} /> <!-- Administratorside -->
        <Route exact path="/statistikk" component={} /> <!-- Statistikk -->

        <Route exact path="/kommune/:munId" component={MunicipalPage} /> <!-- Hjemmeside -->
        <Route exact path="/kommune/:munId/sak" component={IssuePage} /> <!-- Saker (for kommuneansatt?) -->
        <Route exact path="/kommune/:munId/sak/:issueId" component={IssueLarge} /> <!-- Spesifikk sak -->
        <Route exact path="/kommune/:munId/hendelse" component={EventPage} /> <!-- Events -->
        <Route exact path="/kommune/:munId/hendelse/:eventId" component={EventInfo} /> <!-- Events -->
        <Route exact path="/kommune/:munId/ansatt" component={} /> <!-- Ansattside -->
        <Footer />
      </div>
    </HashRouter>,
    root
  );

