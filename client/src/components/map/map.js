// @Flow

import React, { Component, Fragment } from 'react';
import GoogleMap from 'google-map-react';
import isEmpty from 'lodash.isempty';
import { mapService } from '../../services/mapService';

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  width: '18px',
  height: '18px',

  border: '2px solid #fff',
  borderRadius: '100%',
  backgroundColor: '#000',
  //text css
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
};

export class MyGreatPlace extends Component<{ text?: string }> {
  render() {
    return <div style={greatPlaceStyle}>{this.props.text}</div>;
  }
}

export function createMapOptions(maps) {
  return {
    zoomControl: false,
    mapTypeControl: false,
    panControl: false,
    fullscreenControl: false,
    scaleControl: false,
    gestureHandling: 'cooperative',
    styles: [
      {
        stylers: [{ saturation: 0 }, { gamma: 0.8 }, { lightness: 4 }, { visibility: 'on' }]
      },
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }]
      },
      { featureType: 'transit.station', stylers: [{ visibility: 'off' }] }
    ]
  };
}

export class SimpleMap extends Component<{ lat: number, lng: number }> {
  //TODO: Add Issue latlng
  center = null;

  render() {
    return this.renderMap();
  }

  renderMap() {
    this.center = { lat: this.props.lat, lng: this.props.lng };
    if (this.center.lat != 0 && this.center.lng != 0) {
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100%', width: '100%' }}>
          <GoogleMap
            bootstrapURLKeys={{ key: 'AIzaSyCVd-3sSATNkNAa5jRe9U6_t8wR5YkH480', language: 'no' }}
            defaultCenter={this.center}
            defaultZoom={12}
            hoverDistance={30}
            options={createMapOptions}
            onClick={event => this.onClick(event)}
            onChildClick={event => this.onChildClick(event)}
            onChange={event => this.onChange(event)}
            yesIWantToUseGoogleMapApiInternals
          >
            <MyGreatPlace lat={this.center.lat} lng={this.center.lng} text="" />
            {/* <MyGreatPlace lat={this.lat} lng={this.lng} text="" /> */}
          </GoogleMap>
        </div>
      );
    } else {
      return null;
    }
  }

  onClick = ({ x, y, lat, lng, event }) => {
    // console.log(x, y, lat, lng, event);
    // mapService.getLoactionByLatLng(lat, lng).then(e => console.log(e));
    this.lat = lat;
    this.lng = lng;
    // console.log(this.lat, this.lng);
    this.forceUpdate();
  };

  onChildClick = event => {
    console.log('THIS IS A PROBLEM');
  };

  onChange = ({ center, zoom, bounds, marginBounds }) => {
    // console.log(center, zoom, bounds, marginBounds);
  };
}

export class Search extends Component {
  constructor(props) {
    super(props);
    this.clearSearchBox = this.clearSearchBox.bind(this);
  }

  componentDidMount({ map, mapApi } = this.props) {
    const options = {
      // restrict your search to a specific type of result
      // types: ['geocode', 'address', 'establishment', '(regions)', '(cities)'],
      types: ['address'],
      // restrict your search to a specific country, or an array of countries
      // componentRestrictions: { country: ['no', 'us'] },
      componentRestrictions: { country: ['no'] }
    };
    this.autoComplete = new mapApi.places.Autocomplete(this.searchInput, options);
    this.autoComplete.addListener('place_changed', this.onPlaceChanged);
    this.autoComplete.bindTo('bounds', map);
  }

  componentWillUnmount({ mapApi } = this.props) {
    mapApi.event.clearInstanceListeners(this.searchInput);
  }

  componentWillReceiveProps() {
    this.searchInput.value = '';
  }

  onPlaceChanged = ({ map, addplace } = this.props) => {
    const place = this.autoComplete.getPlace();

    if (!place.geometry) return;
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    // this.searchInput.value = getPlace;
    addplace(place);
    this.searchInput.blur();
  };

  clearSearchBox() {
    this.searchInput.value = '';
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div>
        <input
          className="resizeMapBox"
          ref={ref => {
            this.searchInput = ref;
          }}
          type="text"
          onFocus={this.clearSearchBox}
          placeholder="Skriv inn Adresse"
          onClick={this.onClick}
        />
      </div>
    );
  }
}

export class BigMap extends Component {
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
    this.forceUpdate();
  };

  render() {
    const { places, mapApiLoaded, mapInstance, mapApi } = this.state;
    return (
      <Fragment>
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
              <MyGreatPlace key="" lat={place.geometry.location.lat()} lng={place.geometry.location.lng()} text="" />
            ))}
        </GoogleMap>
        {mapApiLoaded && <Search map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />}
      </Fragment>
    );
  }
  onClick = ({ x, y, lat, lng, event }) => {
    // console.log(x, y, lat, lng, event);
    mapService.getLoactionByLatLng(lat, lng).then(e => {
      this.adress = e.adress;
      let reg = e.adress.match(/Norge/);
      if (reg && reg.includes('Norge')) {
        console.log(this.adress);
        // console.log('Norway');
      } else {
        // console.log('Not Norway');
      }
    });
    this.lat = lat;
    this.lng = lng;
    // console.log(this.lat, this.lng);

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
