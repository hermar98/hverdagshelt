// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from './models/User.js';
import { SimpleMap, BigMap } from '../src/components/map/map';

const mapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCVd-3sSATNkNAa5jRe9U6_t8wR5YkH480'
});

export class Map extends Component {
  render() {
    return (
      <div style={{ height: '50vh', width: '100%' }}>
        {/* <SimpleMap lat={63.33} lng={10.43} /> */}
        <BigMap lat={63.33} lng={10.43} />
      </div>
    );
  }
}
