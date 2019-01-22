import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import NewMenu from '../../components/menu/Menu.js';
/*import UploadImageButton from '../../components/image/UploadImageButton.js';*/

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <NewMenu />
      </div>
    );
  }
}
