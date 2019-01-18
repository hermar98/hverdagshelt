import React from 'react'
import { Component } from 'react-simplified';
import axios from 'axios';
import {User} from "../../models";
// import { API_URL } from './config'

axios.interceptors.response.use(response => response.data);

export class AlternativeUpload extends Component {

    state = {
        uploading: false,
        images: []
    };

    uploadImage(formData: FormData): Promise<number> {
        return axios.post('/image-upload', formData);
    }

    onChange = e => {
        const files = Array.from(e.target.files);
        this.setState({ uploading: true });

        const formData = new FormData();

        files.forEach((file, i) => {
            formData.append(i, file)
        });

        this.uploadImage(formData)
            .then(res => res.json())
            .then(images => {
                this.setState({
                    uploading: false,
                    images
                })
            })
    };

    removeImage = id => {
        console.log("HEY");
    };

    render() {
        const { uploading, images } = this.state;

        return (
            <div>
                {/*<Images images={images} removeImage={this.removeImage} />*/}
                <p>helllo</p>
                    <div>
                        <form className="md-form" action="#">
                            <div className="file-field" onChange={(e)=>this.onChange(e)}>
                                <div className="btn btn-primary btn-sm float-left">
                                    <span>Choose files</span>
                                    <input type="file" multiple/>
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text"
                                           placeholder="Upload one or more files"/>
                                </div>
                            </div>
                        </form>
                    </div>
            </div>
        )
    }
}