/*import ReactDOM from 'react-dom';
import * as React from 'react';
import axios from 'axios';
import { Component } from 'react-simplified';
import { Button } from '../../widgets';

export default class UploadImageButton extends Component {
  state = {
    selectedFile: null
  };
  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
    axios.post('/images', fd).then(res => {
      console.log(res);
    });
  };
  render() {
    return (
      <div>
        <input type="file" onChange={this.fileSelectedHandler} />
      </div>
    );
  }
}
*/
