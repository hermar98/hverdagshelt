//@flow
import service from './Service';
import {Image} from "../models/Image.js";
import {Issue} from "../models/Issue";

class ImageService{
    getOneImage(imageId: number): Promise<Image> {
        let token = localStorage.getItem('token');
        if (token) token = JSON.parse(token).jwt;
        return service.get('/image/' + imageId, {
            headers: { 'x-access-token': token }
        });
    }

    getAllImage(issueId: number): Promise<Issue> {
        let token = localStorage.getItem('token');
        if (token) token = JSON.parse(token).jwt;
        return service.get('/image/issue/' + issueId, {
            headers: { 'x-access-token': token }
        });
    }

    uploadImage(image: Image): Promise<Image> {
        let token = localStorage.getItem('token');
        if (token) token = JSON.parse(token).jwt;
        return service.post('/imageUpload', image, {
            headers: { 'x-access-token': token }
        });
    }

    deleteImage(imageId: number): Promise<void> {
        let token = localStorage.getItem('token');
        if (token) token = JSON.parse(token).jwt;
        return service.delete('/image/' + imageId, {
            headers: { 'x-access-token': token }
        });
    }
}

export let imageService = new ImageService();