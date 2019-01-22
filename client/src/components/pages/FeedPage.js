// @flow

import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import { eventService } from '../../services/EventService';
import { issueService } from '../../services/IssueService';
import { userMunicipalService } from '../../services/UserMunicipalService';
import { issueCategoryService } from '../../services/IssueCategoryService';
import { Alert, Card } from '../../widgets';
import {IssueOverviewSmall, IssueSmall} from '../issueViews/issueViews';
import {DisplayEvent2, EventLarge, EventSmall} from "./EventPage";
import Menu from "../menu/Menu";
import NavLink from "react-router-dom/es/NavLink";
import { userService } from '../../services/UserService';
import { tokenManager } from '../../tokenManager';
import { User } from '../../models/User';

let sharedMunicipals = sharedComponentData({municipals: []});
let sharedIssues = sharedComponentData({issues: []});
let sharedEvents = sharedComponentData({events: []});

export class FeedPage extends Component {
  // date for events
  user = new User();
  categories = [];


  munId: number = 0;
  categoryId: number = 0;
  timesort: string = "Nyeste";
  status: number = 0;

  render() {
    return(
      <div>
        <Menu />
        <div className="row">
          <div className="col-lg-6">
            <Card title="Feil/mangler">
              <div className="issue-overview-small">
                <div className="d-flex flex-row sort-box card-header justify-content-between">
                  <div className="form-group mt-2 ml-1">
                    <select className="form-control" id="statusSelect" onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.munId = event.target.value)}>
                      <option value={0}>Alle</option>
                      {sharedMunicipals.municipals.map(mun =>
                        <option key={mun.munId} value={mun.munId}>{mun.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group mt-2">
                    <select className="form-control" id="statusSelect" onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.categoryId = event.target.value)}>
                      <option value={0}>Alle</option>
                      {this.categories.map(cat =>
                        <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group mt-2 mr-1">
                    <select className="form-control" id="statusSelect" onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.timesort = event.target.value)}>
                      <option>Nyeste</option>
                      <option>Eldste</option>
                    </select>
                  </div>
                </div>
              </div>
              <ul className="container-fluid">
                {sharedIssues.issues.map(e => {
                  if(this.status == e.status || this.status == 0) {
                    return(
                    <li key={e.issueId}>
                      <Card>
                        <IssueSmall issue={e} munId={e.munId}/>
                      </Card>
                    </li>
                    )
                  }
                })}
              </ul>
            </Card>
          </div>
          <div className="col-lg-6">
            <Card title="Events" id="event-cards">
              <div className="d-flex flex-row sort-box card-header justify-content-between">
                <div className="form-group mt-2 ml-1">
                  <select className="form-control" id="statusSelect" onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.status = event.target.value)}>
                    <option value={0}>Alle kategorier</option>
                    <option value={2}>Party</option>
                    <option value={3}>Konsert</option>
                    <option value={4}>Galleri</option>
                    <option value={1}>Annet</option>
                  </select>
                </div>
                <div className="form-group mt-2 mr-1">
                  <select className="form-control" id="statusSelect" onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.timesort = event.target.value)}>
                    <option>Nyeste</option>
                    <option>Eldste</option>
                  </select>
                </div>
              </div>
              <ul className="container-fluid">
                {sharedEvents.events.map(e =>
                  <li key={e.eventId}>
                    <EventSmall event={e}/>
                  </li>)}
              </ul>
            </Card>
          </div>
        </div>
        <img className="w-100 h-50" src="../../images/trondheim.jpg"/>
      </div>
    );
  }

  mounted() {
    userService
      .getToken()
      .then(() => {
        userService
          .getUser(tokenManager.getUserId())
          .then(user => {
            this.user = user;
          })
          .catch((error: Error) => console.log(error));
      })
      .catch((error: Error) => console.log(error));

    //GET all municipals a user has subscribed to
    userMunicipalService
      .getUserMunicipals(tokenManager.getUserId())
      .then(muns => {
        sharedMunicipals.municipals = muns;
      })
      .then(()=> console.log(sharedMunicipals.municipals))
      .catch((error: Error) => Alert.danger(error.message));

    //GET all issueCategories
    issueCategoryService
      .getCategories()
      .then(cat => (this.categories = cat))
      .catch((error: Error) => Alert.danger(error.message));


    //GET all Issues registered on the municipals
    sharedMunicipals.municipals.map(e => issueService.getIssuesByMunicipal(e.munId)
      .then(issues => {
        sharedIssues.issues = issues;
      })
      .catch((error: Error) => Alert.danger(error.message)));


    //GET all events registered on the municipals
    eventService.getEventsByMunicipal(528)
      .then(events => {
        sharedEvents.events = events;
      })
      .catch((error: Error) => Alert.danger(error.message));

  }
}


