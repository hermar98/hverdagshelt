import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import { UploadImageButton } from './UploadImageButton';
import axios from 'axios';

export class UploadImageTest extends Component {
  render() {
    return (
      <div>
        <UploadImageButton />
      </div>
    );
  }
}
