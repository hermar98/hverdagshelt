import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../services';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import Menu from '../../components/menu/Menu.js';
import UploadImageButton from '../../components/image/UploadImageButton.js';

export default class HomePage extends Component {
  user = new User();

  render() {
    return (
      <div>
        <Menu />
        <UploadImageButton />
      </div>
    );
  }
}
