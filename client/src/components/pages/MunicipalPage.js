// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { autocomplete, glob } from '../../../public/autocomplete';
import { eventService } from '../../services/EventService';
import { Alert, Card } from '../../widgets';
import { history } from '../../index';
import { IssueOverviewSmall, IssueSmall } from '../issueViews/issueViews';
import { municipalService } from '../../services/MunicipalService';
import { DisplayEvent2, EventLarge, EventSmall } from './EventPage';
import NavLink from 'react-router-dom/es/NavLink';
import { issueService } from '../../services/IssueService';
import { Municipal } from '../../models/Municipal';

export class MunicipalPage extends Component<{ match: { params: { munId: number } } }> {
  //TODO: FIX select by category and date for events
  issues = [];
  events = [];
  municipal = new Municipal();

  render() {
    const hasEvents = this.events.length != 0;
    return (
      <div className="container-fluid">


          <h2 id="munTitle"><img src={ (this.municipal.municipalShield) ? this.municipal.municipalShield : "../images/hverdagshelt-logo-black.svg"} height="75px" alt={this.municipal.name + ' Kommune Skjold'}/>{this.municipal.name} kommune</h2>
        <div className="row page-container">
          <div className="col-lg-6">
            <Card title="Feil/mangler">
              <ul className="container-fluid">
                <IssueOverviewSmall issues={this.issues} />
              </ul>
            </Card>
          </div>
          <div className="col-lg-6">
            <Card title="Events" id="event-cards">
              <div className="d-flex flex-row sort-box justify-content-between">
                <div className="form-group">
                  <select
                    className="form-control"
                    id="statusSelect"
                    onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.status = event.target.value)}
                  >
                    <option value={0}>Alle kategorier</option>
                    <option value={2}>Party</option>
                    <option value={3}>Konsert</option>
                    <option value={4}>Galleri</option>
                    <option value={1}>Annet</option>
                  </select>
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    id="statusSelect"
                    onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.timesort = event.target.value)}
                  >
                    <option>Nyeste</option>
                    <option>Eldste</option>
                  </select>
                </div>
              </div>
              <ul className="list-group issue-small-list">
                {hasEvents ? (this.events.map(e => (
                  <li key={e.eventId}>
                    <EventSmall event={e} />
                  </li>
                ))) : (
                  <li key={0}>
                    <p id="noIssues">Denne kommunen har ingen registrerte events...</p> </li>
                )}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  mounted() {
    issueService
      .getIssuesByMunicipal(this.props.match.params.munId)
      .then(issues => {
        this.issues = issues;
      })
      .catch((error: Error) => Alert.danger(error.message));

    eventService
      .getEventsByMunicipal(this.props.match.params.munId)
      .then(events => (this.events = events))
      .catch((error: Error) => Alert.danger(error.message));

    municipalService
      .getMunicipal(this.props.match.params.munId)
      .then(mun => {
        this.municipal = mun;
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}
