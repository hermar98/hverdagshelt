// @Flow

import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import { mapService } from '../../services/mapService';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

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

function createMapOptions(maps) {
  return {
    zoomControl: false,
    mapTypeControl: false,
    panControl: false,
    fullscreenControl: false,
    scaleControl: true,
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
  center = { lat: this.props.lat, lng: this.props.lng };
  lat = this.props.lat;
  lng = this.props.lng;

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMap
          bootstrapURLKeys={{ key: 'AIzaSyCVd-3sSATNkNAa5jRe9U6_t8wR5YkH480', language: 'no' }}
          defaultCenter={this.center}
          defaultZoom={15}
          hoverDistance={30}
          options={createMapOptions}
          onClick={event => this.onClick(event)}
          onChildClick={event => this.onChildClick(event)}
          onChange={event => this.onChange(event)}
          yesIWantToUseGoogleMapApiInternals
        >
          <MyGreatPlace lat={this.lat} lng={this.lng} text="" />
        </GoogleMap>
      </div>
    );
  }

  onClick = ({ x, y, lat, lng, event }) => {
    // console.log(x, y, lat, lng, event);
    // mapService.getLoactionByLatLng(lat, lng).then(e => console.log(e));
    // this.lat = lat;
    // this.lng = lng;
  };

  onChildClick = event => {
    console.log('THIS IS A PROBLEM');
  };

  onChange = ({ center, zoom, bounds, marginBounds }) => {
    // console.log(center, zoom, bounds, marginBounds);
  };
}
