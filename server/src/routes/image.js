import {Issue, IssuePicture} from '../models';
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

type Request = express$Request;
type Response = express$Response;

const app = require('../app');
app.use(cors({
    origin: CLIENT_ORIGIN
}));
app.use(formData.parse());


// app.post('secure/imageUpload', (req, res) => {
//     console.log("WELCOME");
//     console.log(req.body.imageSource);
//     console.log(req.body.pictureId);
//     console.log(req.body.title);
//     console.log(req.body.issueId);
//
//     cloudinary.config({
//         api_key: '116338133913663',
//         cloud_name: 'hverdagshelt',
//         api_secret: '3jKfbWIScMM2x_iVi78AfKC4yDg'
//     });
//
//     if(!req.body.imageSource){
//         res.sendStatus(200);
//         console.log("shit, no imageSource");
//         return null;
//     } else{
//         console.log(req.body.imageSource);
//     }
//
//     cloudinary.v2.uploader.upload(req.body.imageSource, function(error, result) {
//         if(!result){
//             res.sendStatus(200);
//             console.log("Shit boy, imageUpload failed");
//             return null;
//         } else{
//             return IssuePicture.create({
//                 title: req.body.title,
//                 imageSource: result.url,
//                 issueId: req.body.issueId
//             }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
//         }
//     });
// });

app.post('/secure/imageUpload', (req: Request, res: Response) => {
    console.log("WELCOME");
    console.log(req.body.imageSource);
    console.log(req.body.pictureId);
    console.log(req.body.title);
    console.log(req.body.issueId);

    cloudinary.config({
        api_key: '116338133913663',
        cloud_name: 'hverdagshelt',
        api_secret: '3jKfbWIScMM2x_iVi78AfKC4yDg'
    });

    if(!req.body.imageSource){
        res.sendStatus(200);
        console.log("shit, no imageSource");
        return null;
    } else{
        console.log(req.body.imageSource);
    }

    cloudinary.v2.uploader.upload(req.body.imageSource, function(error, result) {
        if(!result){
            res.sendStatus(200);
            console.log("Shit boy, imageUpload failed");
            return null;
        } else{
            return IssuePicture.create({
                title: req.body.title,
                imageSource: result.url,
                issueId: req.body.issueId
            }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
        }
    });
});


app.post('/image', (req: Request, res: Response) => {
    // const values = Object.values(req.files);
    // const promises = values.map(image => cloudinary.uploader.upload(image.path));
    // Promise.all(promises).then(results => res.json(results));

    return IssuePicture.create({
        title: req.body.title,
        imageSource: req.body.imageSource,
        issueId: req.body.issueId
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});



app.get('/image/:id', (req: Request, res: Response) => {
    return IssuePicture.findOne({
        where: { pictureId: Number(req.params.id) }
    }).then(user => (user ? res.send(user) : res.sendStatus(404)));
});

app.get('/image/issue/:issueId', (req: Request, res: Response) => {
    console.log("server id: " + req.params.issueId)
    return Issue.findOne({
        // where: { '$Issues.issueId$': Number(req.params.issueId) },
        include: [
            {
                model: IssuePicture,
                // as: 'IssuesPictures',
                // through: { model: UserIssue, as: 'UserIssues' },
                required:   true,
            }
        ],
        attributes: [],
        where: {issueId: req.params.issueId}
    }).then(user => (user ? res.send(user) : res.sendStatus(404)));
});

app.delete('/image/:id', (req: Request, res: Response) => {
    return IssuePicture.destroy({
        where: { pictureId: req.params.userId }
        }).then(
        count => (count ? res.sendStatus(200) : res.sendStatus(404))
    );
});

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
// });