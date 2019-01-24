import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Event } from '../../models/Event.js';
import { EventCategory } from '../../models/EventCategory.js';
import { eventCategoryService } from '../../services/EventCategoryService';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import { history } from '../../index';
import { myFunction } from '../../../public/AddEventCategory';
import { tokenManager } from '../../tokenManager';
import {eventService} from "../../services/EventService";
import moment from "moment";
import {HoverButton} from "../issueViews/issueViews";
//import { UploadImageButton } from '../../components/image/UploadImageButton';
import {userService} from '../../services/UserService';

export default class EventForm extends Component {
  event = new Event();
  form = null;
  categories = [];
  filteredCategories = [];
  category = new EventCategory();
  munId = localStorage.getItem('munId');
  user = null;
  dropdownToggle = "";
  startDate = Date;
  startTime = null;
  endDate = Date;
  endTime = null;

  render() {
    return (
      <Card title="Registrer event/hendelse">
        <form ref={e => (this.form = e)}>
          <Form.Input label="Tittel" type="text" onChange={e => (this.event.title = e.target.value)} required placeholder="Tittel" />
          <div className="form-group row justify-content-center">
            <div className="col-12 col-md-4 justify-content-center">
              <select
                required
                className="form-control"
                value={this.event.categoryId}
                onChange={(e: SyntheticInputEvent<HTMLInputElement>) => {
                  if (this.event){this.event.categoryId = parseInt(e.target.value); console.log(e.target.value)};
                }}
              >
                <option selected disabled value="">
                  Velg kategori..
                </option>
                {this.categories.map(cat => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.name}
                    </option>
                ))}
              </select>
            </div>
          </div>
          <Form.InputLarge
            label={"Innhold"}
            type="text"
            onChange={e => (this.event.content = e.target.value)}
            required
            placeholder="Innhold/forklarende tekst"
          />
          <Form.InputDateTime label="Startdato" label2="Tidspunkt" required
                              onChange={e => this.startDate = e.target.value} onChange2={e => this.startTime = e.target.value}/>
          <Form.InputDateTime label="Sluttdato" label2="Tidspunkt" required
                              onChange={e => this.endDate = e.target.value} onChange2={e => this.endTime = e.target.value}/>
          <Form.Input
            label="Sted"
            type="text"
            required
            placeholder="Adresse"
          />
          <Form.FileInput>Legg til bilde (valgfritt) </Form.FileInput>
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <HoverButton onclick={this.save} text="Registrer Event"/>
            </div>
          </div>
        </form>
      </Card>
    );
  }
  save() {
    if (!this.form.checkValidity()) {
      console.log('TRYKKET PÅ');
      return;
    }

    this.event.image = 'imagefile.img';
    this.event.longitude = 1234;
    this.event.latitude = 5678;
    this.event.timeStart = moment(this.startDate + " " + this.startTime);
    this.event.timeEnd = moment(this.endDate + " " + this.endTime);
    this.event.munId = this.munId;
    this.event.userId = this.user.userId;

    eventService
      .addEvent(this.event)
      .then(history.push('/kommune/' + this.munId))
      .catch((error: Error) => Alert.danger(error.message));
  }

  mounted() {
    userService.getCurrentUser()
        .then(user => this.user = user)
        .catch((error: Error) => Alert.danger(error.message));

    eventCategoryService
      .getCategories()
      .then(e => {
        this.categories = e;
        let first = this.categories.shift();
        this.categories.push(first);
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}
