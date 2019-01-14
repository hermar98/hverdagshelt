// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models.js';

const mapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCVd-3sSATNkNAa5jRe9U6_t8wR5YkH480'
});

export class Map extends Component {
  render() {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
}
