import * as IssuePicture from "sequelize";

const app = require('../app');


app.get('/secure/image//:id', (req: Request, res: Response) => {
    return IssuePicture.findAll({
        where: { imageId: Number(req.params.id) }
    }).then(user => (user ? res.send(user) : res.sendStatus(404)));
});

app.post('/secure/image', (req: Request, res: Response) => {
    return IssuePicture.create({
        title: req.body.title,
        imageSource: req.body.imageSource
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.delete('/secure/image/:id', (req: Request, res: Response) => {
    return IssuePicture.destroy({
        where: { pictureId: req.params.userId }
        }).then(
        count => (count ? res.sendStatus(200) : res.sendStatus(404))
    );
});