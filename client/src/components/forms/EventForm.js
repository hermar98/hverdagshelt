import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Event } from '../../models/Event.js';
import { EventCategory } from '../../models/EventCategory.js';
import { eventCategoryService } from '../../services/EventCategoryService';
import { Alert, Form, Card, Button } from '../../widgets';
import { history } from '../../index';
import GoogleMap from 'google-map-react';
import isEmpty from 'lodash.isempty';
import { myFunction } from '../../../public/AddEventCategory';
import { tokenManager } from '../../tokenManager';
import { eventService } from '../../services/EventService';
import moment from 'moment';
import { HoverButton } from '../issueViews/issueViews';
//import { UploadImageButton } from '../../components/image/UploadImageButton';
import { userService } from '../../services/UserService';
import { createMapOptions, MyGreatPlace, Search } from '../map/map';
import { mapService } from '../../services/mapService';
import { municipalService } from '../../services/MunicipalService';
import { Fragment } from 'react';

export default class EventForm extends Component {
  event = new Event();
  form = null;
  categories = [];
  filteredCategories = [];
  category = new EventCategory();
  user = null;
  dropdownToggle = '';
  startDate = Date;
  startTime = null;
  endDate = Date;
  endTime = null;

  center = { lat: 0, lng: 0 };
  lat = null;
  lng = null;
  adress = 'null';
  allMuns = [];

  constructor(props) {
    super(props);

    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: [],
      address: this.adress
    };
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
      address: 'null'
    });
  };

  addPlace = place => {
    this.setState({ places: [place] });
    this.lat = null;
    this.lng = null;
    console.log(place.formatted_address);
    this.adress = place.formatted_address;
    this.setState({ address: place.formatted_address });
    let tmp = this.adress.toString().split(/[\s,]+/);
    this.matchMun(tmp);
    this.forceUpdate();
    this.lat = place.geometry.location.lat();
    this.lng = place.geometry.location.lng();

    // municipalService.getMunicipalId(tmp).then(p => {
    //   this.munId = p.munId;
    //   console.log(this.munId);
    // });
  };

  render() {
    return (
      <Card title="Registrer event/hendelse">
        <form ref={e => (this.form = e)}>
          <Form.Input
            label="Tittel"
            type="text"
            onChange={e => (this.event.title = e.target.value)}
            required
            placeholder="Tittel"
          />
          <div className="form-group row justify-content-center">
            <div className="col-12 col-md-4 justify-content-center">
              <select
                required
                className="form-control"
                value={this.event.categoryId}
                onChange={(e: SyntheticInputEvent<HTMLInputElement>) => {
                  if (this.event) {
                    this.event.categoryId = parseInt(e.target.value);
                    console.log(e.target.value);
                  }
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
            label={'Innhold'}
            type="text"
            onChange={e => (this.event.content = e.target.value)}
            required
            placeholder="Innhold/forklarende tekst"
          />
          <Form.InputDateTime
            label="Startdato"
            label2="Tidspunkt"
            required
            onChange={e => {
              this.startDate = e.target.value;
              document.getElementById('dateEnd').setAttribute('min', this.startDate);
            }}
            onChange2={e => (this.startTime = e.target.value)}
          />
          <Form.InputDateTime
            id="dateEnd"
            label="Sluttdato"
            label2="Tidspunkt"
            required
            onChange={e => (this.endDate = e.target.value)}
            onChange2={e => (this.endTime = e.target.value)}
          />
          <div className="form-group row justify-content-center" style={{ height: '300px' }}>
            <div className="col-12 col-md-4 justify-content-center">
              <div className="mapcontainer">{this.renderMap()}</div>
            </div>
          </div>
          <Form.FileInput>Legg til bilde (valgfritt) </Form.FileInput>
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <HoverButton type="submit" onclick={this.save} text="Registrer Event" />
            </div>
          </div>
        </form>
      </Card>
    );
  }

  renderMap() {
    const { places, mapApiLoaded, mapInstance, mapApi } = this.state;
    if (this.center.lat != 0 && this.center.lng != 0) {
      return (
        <Fragment>
          {mapApiLoaded && <Search map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />}

          <GoogleMap
            bootstrapURLKeys={{
              key: 'AIzaSyCVd-3sSATNkNAa5jRe9U6_t8wR5YkH480',
              language: 'no',
              libraries: ['places', 'geometry']
            }}
            defaultCenter={this.center}
            defaultZoom={9}
            hoverDistance={30}
            options={createMapOptions}
            onClick={event => this.onClick(event)}
            onChildClick={event => this.onChildClick(event)}
            onChange={event => this.onChange(event)}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
          >
            {/* <MyGreatPlace lat={this.center.lat} lng={this.center.lng} text="" /> */}
            <MyGreatPlace lat={this.lat} lng={this.lng} text="" />
            {!isEmpty(places) &&
              places.map(place => (
                <MyGreatPlace key="" lat={place.geometry.location.lat()} lng={place.geometry.location.lng()} text="" />
              ))}
          </GoogleMap>
        </Fragment>
      );
    } else {
      return null;
    }
  }

  save() {
    if (!this.form.checkValidity() || !this.lat || !this.lng) {
      console.log('TRYKKET PÅ');
      return;
    }

    this.event.image = 'imagefile.img';
    this.event.longitude = this.lng;
    this.event.latitude = this.lat;
    this.event.timeStart = moment(this.startDate + ' ' + this.startTime);
    this.event.timeEnd = moment(this.endDate + ' ' + this.endTime);
    this.event.munId = this.user.munId;
    this.event.userId = this.user.userId;

    eventService
      .addEvent(this.event)
      .then(history.push('/kommune/' + this.event.munId))
      .catch((error: Error) => Alert.danger(error.message));
  }

  mounted() {
    userService
      .getCurrentUser()
      .then(user => {
        this.user = user;
        console.log(user.munId);
        municipalService
          .getMunicipal(user.munId)
          .then(e =>
            mapService.getLoactionByAdress(e.name).then(d => console.log((this.center = d[0].geometry.location)))
          );
      })
      .catch((error: Error) => Alert.danger(error.message));

    eventCategoryService
      .getCategories()
      .then(e => {
        this.categories = e;
        let first = this.categories.shift();
        this.categories.push(first);
      })
      .catch((error: Error) => Alert.danger(error.message));

    municipalService.getMunicipals().then(e => (this.allMuns = e));
  }

  matchMun(arr: String[]) {
    let name = '';
    name = arr.map(e => {
      return this.allMuns.find(mun => mun.name == e);
    });
    let tmp = name.find(e => e != undefined);
    municipalService.getMunicipalId(tmp.name).then(e => {
      this.munId = e.munId;
      console.log(this.munId);
    });
  }

  onClick = ({ x, y, lat, lng, event }) => {
    // console.log(x, y, lat, lng, event);
    mapService.getLoactionByLatLng(lat, lng).then(e => {
      console.log(e[0]);
      this.adress = e[0].formatted_address;
      this.setState({ address: e[0].formatted_address });

      let reg = e[0].formatted_address.match(/Norge/);
      if (reg && reg.includes('Norge')) {
        console.log(this.adress);
        let tmp = this.adress.toString().split(/[\s,]+/);
        console.log(tmp ? tmp : 'not a valid mun');
        this.matchMun(tmp);
        // console.log('Norway');
      } else {
        // console.log('Not Norway');
      }
    });
    this.lat = lat;
    this.lng = lng;
    console.log(this.lat, this.lng);

    this.state.places = [];

    this.forceUpdate();
  };

  onChildClick = event => {
    console.log('THIS IS A PROBLEM');
  };

  onChange = ({ center, zoom, bounds, marginBounds }) => {
    // console.log(center, zoom, bounds, marginBounds);
  };
}
