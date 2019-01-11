import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Event } from '../../models.js';
import { eventService} from '../../services';
import {Alert, DisplayEvent} from '../../widgets';
import {Issue} from "../../models";
import {Status} from "../issueViews/issueViews";
import moment from "moment";


export class EventPage extends Component {
  events = [];

  render() {
    return (
      <div className="container col-10 mt-4 h-100">
        <div className="row h-100">
        {this.events.map(e =>
        <EventLarge event={e}/>)}
        </div>
      </div>
    );
  }

  mounted(){
    eventService
      .getEvents()
      .then(e => this.events = e)
      .catch((error: Error) => Alert.danger(error.message));
  }
}


export class DisplayEvent2 extends Component<{event: Event}>{
  render () {
    return (
      <div className="issue-normal" event={this.props.event}>
        <div className="d-flex flex-row issue-flex">
          <div className="p-2">
            <img className="card-img issue-image" src={this.props.event.image}/>
          </div>
          <div className="p-2"><h1>{this.props.event.title}</h1></div>
        </div>
      </div>
    )
  }

  mounted(){

  }
}

export class EventPage2 extends Component<{issues: Issue[]}> {
  render () {
    return (
      <div className="issue-overview-normal">
        <ul className="list-group">
          {this.props.issues.map(e =>
            <li className="list-group-item">
              <DisplayEvent2 event={e}/>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export class EventLarge extends Component<{ event: Event }> {
  render() {
    return (
      <div className="event-large" event={this.props.event}>
        <div className="card">
          <div className="card-body">
            <div className="card-title">
              <h2>{this.props.event.title}</h2>
            </div>
            <div className="card-text">
              <p>{this.props.event.content}</p>
            </div>
          </div>
            <img className="event-image" src="https://www.naf.no/globalassets/tips-rad/vei-trafikk/hull_i_veien_bil2.jpg?width=980&height=550&mode=max&anchor=middlecenter&scale=both&quality=85"/>
          <div className="card-footer">
            <div className="row">
            <small class="text-muted-left">{"Starter: " + moment(this.props.event.time_start).format("DD.MM.YYYY HH:mm")}</small>
            <small class="text-muted-right">{"Slutter: " + moment(this.props.event.time_end).format("DD.MM.YYYY HH:mm")}</small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}