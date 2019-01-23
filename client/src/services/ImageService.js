//@flow
import service from './Service';
import {Image} from "../models/Image.js";

class ImageService{
    getImage(imageId: number): Promise<Image> {
        let token = localStorage.getItem('token');
        if (token) token = JSON.parse(token).jwt;
        return service.get('/secure/image/' + imageId, {
            headers: { 'x-access-token': token }
        });
    }

    uploadImage(image: Image): Promise<Image> {
        console.log("ON OUR WAY");
        return service.post('/imageUpload', image);
    }

    deleteImage(imageId: number): Promise<void> {
        let token = localStorage.getItem('token');
        if (token) token = JSON.parse(token).jwt;
        return service.delete('/secure/image/' + imageId, {
            headers: { 'x-access-token': token }
        });
    }
}

export let imageService = new ImageService();