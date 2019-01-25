// @flow

import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import { eventService } from '../../services/EventService';
import { issueService } from '../../services/IssueService';
import { userMunicipalService } from '../../services/UserMunicipalService';
import { issueCategoryService } from '../../services/IssueCategoryService';
import { eventCategoryService } from '../../services/EventCategoryService';
import { Alert, Card } from '../../widgets';
import { IssueOverviewSmall, IssueSmall } from '../issueViews/issueViews';
import { DisplayEvent2, EventLarge, EventSmall } from './EventPage';
import NavLink from 'react-router-dom/es/NavLink';
import { userService } from '../../services/UserService';
import { tokenManager } from '../../tokenManager';
import { User } from '../../models/User';
import { history } from '../../index';

let sharedMunicipals = sharedComponentData({ municipals: [] });
let sharedIssues = sharedComponentData({ issues: [] });
let sharedEvents = sharedComponentData({ events: [] });

export class FeedPage extends Component {
  // date for events
  user = new User();
  iCategories = [];
  eCategories = [];

  munId: number = 0;
  iCategoryId: number = 0;
  eCategoryId: number = 0;
  issueSort: number = 1;
  eventSort: number = 2;
  status: number = 0;
  date = new Date(Date.now());

  render() {
    const hasMunicipals = sharedMunicipals.municipals.length != 0;
    const hasEvents = sharedEvents.events.length != 0;
    const hasIssues = sharedIssues.issues.length != 0;

    return (
      <div className="container-fluid">
        <h2 id="munTitle">Min Side</h2>

        <div className="row page-container">
          <div className="col-lg-6">
            <Card title="Feil/mangler">
              <div className="issue-overview-small">
                <div className="d-flex flex-row sort-box justify-content-between">
                  <div className="form-group mt-2 ml-1">
                    <select
                      className="form-control"
                      id="statusSelect"
                      onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.munId = event.target.value)}
                    >
                      <option value={0}>Alle kommuner</option>
                      {sharedMunicipals.municipals.map(mun => (
                        <option key={mun.munId} value={mun.munId}>
                          {mun.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group mt-2">
                    <select
                      className="form-control"
                      id="statusSelect"
                      onChange={(event): SyntheticInputEvent<HTMLInputElement> =>
                        (this.iCategoryId = event.target.value)
                      }
                    >
                      <option value={0}>Alle kategorier</option>
                      {this.iCategories.map(cat => (
                        <option key={cat.categoryId} value={cat.categoryId}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group mt-2 mr-1">
                    <select
                      className="form-control"
                      id="statusSelect"
                      onChange={(event): SyntheticInputEvent<HTMLInputElement> => {
                        this.issueSort = event.target.value;
                        this.sortIssues();
                      }}
                    >
                      <option value={1}>Nyeste</option>
                      <option value={2}>Eldste</option>
                    </select>
                  </div>
                </div>
              </div>
              <ul className="list-group issue-small-list">
                {hasMunicipals ? (
                  hasIssues ? (
                    Array.from(
                      new Set(
                        sharedIssues.issues
                          .filter(e => {
                            return (
                              e.statusId !== 1 &&
                              (e.categoryId == this.iCategoryId || this.iCategoryId == 0) &&
                              (e.munId == this.munId || this.munId == 0)
                            );
                          })
                          .sort((a, b) => {
                            if (a.createdAt < b.createdAt) {
                              return 1;
                            } else if (a.createdAt > b.createdAt) {
                              return -1;
                            } else {
                              return 0;
                            }
                          })
                          .map(e => (
                            <li key={e.issueId} className="list-group-item">
                              <IssueSmall issue={e} munId={e.munId} />
                            </li>
                          ))
                      )
                    )
                  ) : (
                    <li key={0}>
                      <p id="noIssues">Denne kommunen har ingen registrerte saker...</p>{' '}
                    </li>
                  )
                ) : (
                  <li key={0}>
                    <p id="feedInfo">Du har ikke valgt kommuner enda...</p>
                    <p id="feedLink" onClick={this.toProfile}>
                      Gå til profilsiden for å velge kommuner du vil følge
                    </p>
                  </li>
                )}
              </ul>
            </Card>
          </div>
          <div className="col-lg-6">
            <Card title="Events" id="event-cards">
              <div className="d-flex flex-row sort-box justify-content-between">
                <div className="form-group mt-2 ml-1">
                  <select
                    className="form-control"
                    id="statusSelect"
                    onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.eCategoryId = event.target.value)}
                  >
                    <option value={0}>Alle kategorier</option>
                    {this.eCategories.map(e => (
                      <option key={e.eventId} value={e.categoryId}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mt-2 mr-1">
                  <select
                    className="form-control"
                    id="statusSelect"
                    onChange={(event): SyntheticInputEvent<HTMLInputElement> => {
                      this.eventSort = event.target.value;
                      this.sortEvents();
                    }}
                  >
                    <option value={2}>Eldste</option>
                    <option value={1}>Nyeste</option>
                  </select>
                </div>
              </div>
              <ul className="list-group issue-small-list">
                {hasMunicipals ? (
                  hasEvents ? (
                    Array.from(
                      new Set(
                        sharedEvents.events
                          .filter(e => {
                            return (
                              (e.categoryId == this.eCategoryId || this.eCategoryId == 0) &&
                              new Date(e.timeEnd) > this.date
                            );
                          })
                          .sort((a, b) => {
                            if (a.timeStart > b.timeStart) {
                              return 1;
                            } else if (a.timeStart < b.timeStart) {
                              return -1;
                            } else {
                              return 0;
                            }
                          })
                          .map(e => (
                            <li key={e.eventId}>
                              <EventSmall event={e} />
                            </li>
                          ))
                      )
                    )
                  ) : (
                    <li key={0}>
                      <p id="noEvents">Denne kommunen har ingen registrerte hendelser...</p>{' '}
                    </li>
                  )
                ) : (
                  <li key={0}>
                    <p id="feedInfo">Du har ikke valgt kommuner enda...</p>
                    <p id="feedLink" onClick={this.toProfile}>
                      Gå til profilsiden for å velge kommuner du vil følge
                    </p>
                  </li>
                )}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  mounted() {
    userService
      .getCurrentUser()
      .then(user => {
        this.user = user;
        //GET all municipals a user has subscribed to
        userMunicipalService
          .getUserMunicipals(this.user.userId)
          .then(muns => {
            sharedMunicipals.municipals = muns;
            sharedMunicipals.municipals.map(e =>
              issueService
                .getIssuesByMunicipal(e.munId)

                //GET all Issues registered on the municipals
                .then(issues => {
                  Array.prototype.push.apply(sharedIssues.issues, issues);
                })

                .catch((error: Error) => Alert.danger(error.message))
            );

            //GET all events registered on the municipals
            sharedMunicipals.municipals.map(e =>
              eventService
                .getEventsByMunicipal(e.munId)
                .then(events => {
                  Array.prototype.push.apply(sharedEvents.events, events);
                })
                .catch((error: Error) => Alert.danger(error.message))
            );
          })
          .catch((error: Error) => Alert.danger(error.message));
      })
      .catch((error: Error) => console.log(error));

    //GET all issueCategories
    issueCategoryService
      .getCategories()
      .then(cat => (this.iCategories = cat))
      .catch((error: Error) => Alert.danger(error.message));

    eventCategoryService
      .getCategories()
      .then(cat => (this.eCategories = cat))
      .catch((error: Error) => Alert.danger(error.message));

    console.log(this.date);
  }

  sortIssues() {
    if (this.issueSort == 1) {
      sharedIssues.issues.sort(function(a, b) {
        if (a.createdAt < b.createdAt) {
          return 1;
        } else if (a.createdAt > b.createdAt) {
          return -1;
        } else {
          return 0;
        }
      });
      console.log(this.issueSort);
    } else if (this.issueSort == 2) {
      sharedIssues.issues.sort(function(a, b) {
        if (a.createdAt > b.createdAt) {
          return 1;
        } else if (a.createdAt < b.createdAt) {
          return -1;
        } else {
          return 0;
        }
      });
      console.log(this.issueSort);
    }
  }

  sortEvents() {
    if (this.eventSort == 1) {
      sharedEvents.events.sort(function(a, b) {
        if (a.timeStart < b.timeStart) {
          return 1;
        } else if (a.timeStart > b.timeStart) {
          return -1;
        } else {
          return 0;
        }
      });
      console.log(this.eventSort);
    } else if (this.eventSort == 2) {
      sharedEvents.events.sort(function(a, b) {
        if (a.timeStart > b.timeStart) {
          return 1;
        } else if (a.timeStart < b.timeStart) {
          return -1;
        } else {
          return 0;
        }
      });
      console.log(this.eventSort);
    }
  }

  toProfile() {
    history.push('/profil');
  }
}
