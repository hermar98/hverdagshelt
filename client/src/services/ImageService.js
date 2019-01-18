//@flow
import service from './Service';
import {Image} from "../models/Image.js";

class ImageService{
    static getImage(imageId: number): Promise<Image> {
        let token = localStorage.getItem('token');
        if (token) token = JSON.parse(token).jwt;
        return service.get('/secure/image/' + imageId, {
            headers: { 'x-access-token': token }
        });
    }

    static addImage(image: Image): Promise<number> {
        return service.post('/secure/image', image);
    }

    static deleteImage(imageId: number): Promise<void> {
        let token = localStorage.getItem('token');
        if (token) token = JSON.parse(token).jwt;
        return service.delete('/secure/image/' + imageId, {
            headers: { 'x-access-token': token }
        });
    }

}   