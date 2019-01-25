import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import { imageService } from '../../services/ImageService';
import { Image } from '../../models/Image';
import { Issue } from '../../models/Issue';
import { issueService } from '../../services/IssueService';
import { history } from '../../index';

let shared = sharedComponentData({ tFiles: [] });

export default class UploadImageButton extends Component {
  state = {
    selectedFile: null,
    imagePreviewUrl: '',
    isLoaded: false,
    uploading: false,
    images: []
  };

  fileSelectedHandler(e) {
    e.preventDefault();

    let reader = new FileReader();
    let files = e.target.files;

    Array.from(files).map(e => {
      reader.onloadend = () => {
        shared.tFiles.push({ path: reader.result, name: e.name });
      };
      reader.readAsDataURL(e);
    });
    // shared.tFiles.push(e.target.files);
  }

  uploadTheImage(issueId: number) {
    const files = Array.from(shared.tFiles);
    this.setState({ uploading: true });

    if (issueId == null || issueId === 0) {
      issueId = 1;
    }

    files.forEach(file => {
      let image: Image;
      image = {
        imageSource: file.path,
        title: file.name,
        issueId: issueId
      };

      imageService.uploadImage(image);
    });
  }

  printFaenHode(issue: Issue) {
    issueService
      .addIssue(issue)
      .then(id => {
        this.uploadTheImage(id.issueId);
      })
      .then(history.push('/profil/'))
      .catch((error: Error) => Alert.danger(error.message));
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = <img src={this.state.imagePreviewUrl} alt="upload image"/>;
    } else {
      $imagePreview = <div>Velg ett eller flere bilder (valgfritt):</div>;
    }

    return (
        <div className="justify-content-center row">
          <div className="col-12 col-md-4 ">
            <div className="image-upload-form">
              <div className="card image-upload-container">
                <div className="image-upload-text">{$imagePreview}</div>
                <div className="card image-upload-list">
                  <div className="image-upload-images-text">Ingen bilder opplastet!</div>
                  {Array.from(shared.tFiles).map(function(e, i) {
                    console.log(e);
                    if (e.path) {
                      return (
                        <div key={i} className="image-upload-images">
                          <img className="image-upload-image" src={e.path} alt={ }/>
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="image-upload-button">
                  <input type="file" onChange={e => this.fileSelectedHandler(e)} size="60" />
                </div>
                {/*<button type={"btn"} className="btn" onClick={() => this.postImage(1)}/>*/}
              </div>
            </div>
          </div>
        </div>
    );
  }
  //onSubmit={e => this.postImage(e)}
}
