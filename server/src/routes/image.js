import * as IssuePicture from "sequelize";
const cloudinary = require('cloudinary');
const { CLIENT_ORIGIN } = require('./config');
const formData = require('express-form-data');
const cors = require('cors');
require('dotenv').config();

// cloudinary.config({
//     api_key: '116338133913663',
//     // cloud_name: 'hverdagshelt',
//     // api_secret: '3jKfbWIScMM2x_iVi78AfKC4yDg'
// });

console.log("HEY BOOBY");
console.log(process.env.CLOUD_NAME);
console.log(process.env.API_KEY);
console.log(process.env.API_SECRET);

type Request = express$Request;
type Response = express$Response;

const app = require('../app');
app.use(cors({
    origin: CLIENT_ORIGIN
}));
app.use(formData.parse());


app.post('/image-upload', (req, res) => {

    cloudinary.config({
        api_key: '116338133913663',
        cloud_name: 'hverdagshelt',
        api_secret: '3jKfbWIScMM2x_iVi78AfKC4yDg'
    });

    console.log("NIGGER");

    const values = Object.values(req.files);
    values.map(image => console.log(image.path));
    values.map(image => console.log(image.name));
    const promises = values.map(image => cloudinary.v2.uploader.upload(image.path));
    console.log("NIGGER3");

    Promise
        .all(promises)
        .then(results => res.json(results))
});


app.post('/secure/image', (req: Request, res: Response) => {
    // const values = Object.values(req.files);
    // const promises = values.map(image => cloudinary.uploader.upload(image.path));
    // Promise.all(promises).then(results => res.json(results));

    return IssuePicture.create({
        title: req.body.title,
        imageSource: req.body.imageSource,
        issueId: req.body.issueId
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});



app.get('/secure/image//:id', (req: Request, res: Response) => {
    return IssuePicture.findOne({
        where: { imageId: Number(req.params.id) }
    }).then(user => (user ? res.send(user) : res.sendStatus(404)));
});

app.delete('/secure/image/:id', (req: Request, res: Response) => {
    return IssuePicture.destroy({
        where: { pictureId: req.params.userId }
        }).then(
        count => (count ? res.sendStatus(200) : res.sendStatus(404))
    );
});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})