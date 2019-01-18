import ReactDOM from 'react-dom';
import * as React from 'react';
import axios from 'axios';
import { Component } from 'react-simplified';
import { Button } from '../../widgets';

export class UploadImageButton extends Component {
  state = {
    selectedFile: null,
    imagePreviewUrl: '',
    isLoaded: false
  };
  fileSelectedHandler(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({ selectedFile: file }),
        this.setState({ imagePreviewUrl: reader.result }),
        this.setState({ isLoaded: true });
    };

    reader.readAsDataURL(file);
  }

  handleSubmit() {
    //Send inn bildeURL til database
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = <img src={this.state.imagePreviewUrl} />;
    } else {
      $imagePreview = <div>Velg et bilde</div>;
    }

    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input type="file" onChange={e => this.fileSelectedHandler(e)} />
          <button type="submit">Lagre Bilde</button>
        </form>
        <div className="imgPreview">{$imagePreview}</div>
      </div>
    );
  }
}


