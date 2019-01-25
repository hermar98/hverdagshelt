import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { EventCategory } from '../../models/EventCategory.js';
import { eventCategoryService } from '../../services/EventCategoryService';
import { Alert, DisplayEvent } from '../../widgets';
import { Issue } from '../../models/Issue';
import {User} from '../../models/User';
import {ImageButton, Status} from '../issueViews/issueViews';
import moment from 'moment';
import { eventService } from '../../services/EventService';
import { Event } from '../../models/Event';
import {SimpleMap} from "../map/map";
import {userService} from "../../services/UserService";
import { history } from '../../index';

export class EventPage extends Component {
  events = [];

  render() {
    return (
      <div>
        <div className="container col-10 mt-4 h-100">
          <div className="row h-100">
            {this.events.map(e => (
              <EventLarge event={e} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  mounted() {
    let munId = localStorage.getItem('munId');
    console.log(munId);
    eventService
      .getEventsByMunicipal(munId)
      .then(e => (this.events = e))
      .catch((error: Error) => Alert.danger(error.message));
  }
}

export class DisplayEvent2 extends Component<{ event: Event }> {
  render() {
    return (
      <div className="issue-normal" event={this.props.event}>
        <div className="d-flex flex-row issue-flex">
          <div className="p-2">
            <img className="card-img issue-image" src={this.props.event.image} alt="sak bilde"/>
          </div>
          <div className="p-2">
            <h1>{this.props.event.title}</h1>
          </div>
        </div>
      </div>
    );
  }

  mounted() {}
}

export class EventPage2 extends Component<{ issues: Issue[] }> {
  render() {
    return (
      <div className="issue-overview-normal">
        <ul className="list-group">
          {this.props.issues.map(e => (
            <li className="list-group-item">
              <DisplayEvent2 event={e} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export class EventLarge extends Component<{ event: Event }> {
  render() {
    return (
      <div className="card" id="card-event">
        <div className="card-body">
          <div className="card-title-event">
            <h2>{this.props.event.title}</h2>
          </div>
          <div className="card-text">
            <p>{this.props.event.content}</p>
          </div>
        </div>
        <img
          className="event-image"
          src="https://www.naf.no/globalassets/tips-rad/vei-trafikk/hull_i_veien_bil2.jpg?width=980&height=550&mode=max&anchor=middlecenter&scale=both&quality=85"
          alt="hendelse bilde"
        />
        <div className="card-footer">
          <small className="text-muted-left">
            {'Fra: ' + moment(this.props.event.timeStart).format('DD.MM HH:mm')}
          </small>
          <small className="text-muted-right">{'Til: ' + moment(this.props.event.timeEnd).format('DD.MM HH:mm')}</small>
        </div>
      </div>
    );
  }
}

export class EventSmall extends Component<{ event: Event }> {
  textLength = 50;

  render() {
    return (
      <div className="card">
        <a id="a-hover" href={'#/hendelser/' + this.props.event.eventId}>
          <img src="../../images/arrowRightTrans.png" alt="right arrow" />
        </a>
        <div className="card-body">
          <div className="row">
            <h5 className="card-title">{this.props.event.title}</h5>
            <img id="event-image-small" src={this.props.event.image} alt="hendelse bilde" />
          </div>
        </div>
        <div>
          {this.props.event.content <= this.textLength
            ? this.props.event.content
            : this.props.event.content.substring(0, this.textLength) + '...'}
        </div>
        <div className="card-footer">
          <small className="text-muted-left">
            {'Starter: ' + moment(this.props.event.timeStart).format('DD.MM HH:mm')}
          </small>
          <small className="text-muted-right">
            {'Slutter: ' + moment(this.props.event.timeEnd).format('DD.MM HH:mm')}
          </small>
        </div>
      </div>
    );
  }

  mounted() {}
}

export class EventInfo extends Component<{ match: { params: { eventId: number } } }> {
  event = null;
  eventCategory = null;
  user = null;
  isMunEmployee: boolean = false;

  render() {
    if (!this.event) return null;
    if (!this.eventCategory) return null;

    return (
      <div>
        <div className="container my-4">
          <div className="card">
            <img className="card-img-top" src={this.event.image} alt="hendelse bilde"/>
            <div className="card-body">
              <div className="row justify-content-between">
              <h2 className="card-title">{this.event.title}</h2>
                {this.isMunEmployee ? <div><ImageButton source="../../images/trashcan.png" onclick={this.delete}/></div> : <div></div>}
              </div>
              <p className="card-text">
                <div className="row justify-content-between">
                <div>
                  <small>
                  <b>Kategori: </b>
                  {this.eventCategory.name}
                  <br />
                  <b>Fra: </b>
                  {moment(this.event.timeStart).format('DD.MM.YYYY HH:mm')}
                  <br />
                  <b>Til: </b>
                  {moment(this.event.timeEnd).format('DD.MM.YYYY HH:mm')}
                  <br />
                  <b>Sted (koordinater): </b>
                  {this.event.latitude + ', ' + this.event.longitude}
                  <br/>
                  </small>
                  <br/>
                  <p className="card-text">{this.event.content}</p>
                </div>
                  <div style={{height: '300px', width: '300px', float: 'right'}}>
                        <SimpleMap lat={this.event.latitude} lng={this.event.longitude}/>
                    </div>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  mounted() {
    eventService
      .getEvent(this.props.match.params.eventId)
      .then(event => {
        this.event = event;
        userService
          .getCurrentUser()
          .then(user => {
            this.user = user;
            if(this.user.rank === 3 && this.user.munId === this.event.munId){
              this.isMunEmployee = true;
            }})
          .catch(e => console.log(e));
        eventCategoryService
          .getCategory(event.categoryId)
          .then(eventCategory => (this.eventCategory = eventCategory))
          .catch((error: Error) => Alert.danger(error.message));
      })
      .catch((error: Error) => Alert.danger(error.message));
  }

  delete(){
    if (confirm("Are you sure?")) {
      if(this.user.munId === this.event.munId) {
        eventService
          .deleteEvent(this.event.eventId)
          .then(e => history.push('/kommune/' + this.user.munId))
          .catch(e => console.log(e));
      }
    }
  }
}
