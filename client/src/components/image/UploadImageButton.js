import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import { imageService } from '../../services/ImageService';
import { Button } from '../../widgets';
import { Image } from '../../models/Image';
import { Issue } from '../../models/Issue';
import { issueService } from '../../services/IssueService';
import { issueCategoryService } from '../../services/IssueCategoryService';
import { IssueNormal } from '../issueViews/issueViews';
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
      .then(history.push('/municipal/' + this.munId + '/issues'))
      .catch((error: Error) => Alert.danger(error.message));
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
        <div className="imagePreView">{$imagePreview}</div>
        <ul className="imageList">
          {Array.from(shared.tFiles).map(function(e, i) {
            console.log(e);
            if (e.path) {
              return (
                <li key={i} style={{ height: 200, width: 200 }} className="list-group-item normal-list-item">
                  <img className={'imageView'} src={e.path} />
                </li>
              );
            }
          })}
          <li className={'One More Picture'}>
            <form>
              <input type="file" onChange={e => this.fileSelectedHandler(e)} />
            </form>
          </li>
        </ul>
        {/*<button type={"btn"} className="btn" onClick={() => this.postImage(1)}/>*/}
      </div>
    );
  }
  //onSubmit={e => this.postImage(e)}
}
