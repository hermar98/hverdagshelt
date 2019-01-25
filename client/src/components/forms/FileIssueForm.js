// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Fragment } from 'react';
import { Component } from 'react-simplified';
import { Issue } from '../../models/Issue.js';
import { issueCategoryService } from '../../services/IssueCategoryService.js';
import { Alert, Form, Card, Button } from '../../widgets';
import { history } from '../../index';
import GoogleMap from 'google-map-react';
import isEmpty from 'lodash.isempty';
import { tokenManager } from '../../tokenManager';
import { userService } from '../../services/UserService';
import UploadImageButton from '../image/UploadImageButton';
import { HoverButton } from '../issueViews/issueViews';
import { createMapOptions, MyGreatPlace, Search } from '../map/map';
import { mapService } from '../../services/mapService';
import { municipalService } from '../../services/MunicipalService';

export default class RegisterIssue extends Component {
  issue = new Issue();
  categories = [];
  form = null;
  munId = null;
  munName = null;
  upload: UploadImageButton = null;
  allMuns = [];

  center = { lat: 61.84525971271803, lng: 9.260079962159239 };
  lat = null;
  lng = null;
  adress = null;
  constructor(props) {
    super(props);

    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: []
    };
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps
    });
  };

  addPlace = place => {
    this.setState({ places: [place] });
    this.lat = null;
    this.lng = null;
    console.log(place.formatted_address);
    this.adress = place.formatted_address;
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
    const { places, mapApiLoaded, mapInstance, mapApi } = this.state;
    return (
      <Card title="Registrer sak">
        <form ref={e => (this.form = e)}>
          <div className="form-group row justify-content-center">
            <div className="col-sm-10 col-lg-4 justify-content-center">
              <label>Kategori</label>
              <select
                required
                className="form-control"
                value={this.issue.categoryId || ''}
                onChange={(e: SyntheticInputEvent<HTMLInputElement>) => {
                  if (this.issue) this.issue.categoryId = parseInt(e.target.value);
                }}
              >
                <option disabled selected value="">
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
            type="text"
            label="Innhold"
            onChange={event => (this.issue.content = event.target.value)}
            required
            placeholder="Skriv inn detaljer om saken..."
          />
          <div className="form-group row justify-content-center" style={{ height: '400px', padding: '0 0 40px 0' }}>
            <div className="col-12 col-md-4 justify-content-center">
              <label>Velg lokasjon</label><br/>
              <small>Skriv inn en adresse eller klikk på kartet.</small><br/>
              <Fragment>
                {mapApiLoaded && <Search map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />}
                <GoogleMap
                  bootstrapURLKeys={{
                    key: 'AIzaSyCVd-3sSATNkNAa5jRe9U6_t8wR5YkH480',
                    language: 'no',
                    libraries: ['places', 'geometry']
                  }}
                  defaultCenter={this.center}
                  defaultZoom={5}
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
                      <MyGreatPlace
                        key=""
                        lat={place.geometry.location.lat()}
                        lng={place.geometry.location.lng()}
                        text=""
                      />
                    ))}
                </GoogleMap>
              </Fragment>
            </div>
          </div>
          <div className="mt-5">
            <UploadImageButton
              ref={boy => {
                this.upload = boy;
              }}
            />
          </div>
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <HoverButton type="submit" onclick={this.save} text="Send Inn" />
            </div>
          </div>
        </form>
      </Card>
    );
  }

  save() {
    if (!this.form || !this.form.checkValidity()) return;

    this.issue.userId = this.user.userId;
    this.issue.munId = this.munId;
    this.issue.latitude = this.lat;
    this.issue.longitude = this.lng;
    this.issue.image = '';

    this.upload.printFaenHode(this.issue);
  }

  mounted() {
    userService
      .getCurrentUser()
      .then(user => (this.user = user))
      .catch((error: Error) => Alert.danger(error.message));

    issueCategoryService
      .getCategories()
      .then(issueCategories => (this.categories = issueCategories))
      .then(() => console.log(this.categories))
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
      let reg = e[0].formatted_address.match(/Norge/);
      if (reg && reg.includes('Norge')) {
        console.log(this.adress);
        let tmp = this.adress.toString().split(/[\s,]+/);
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
