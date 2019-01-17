import {Feedback, Issue} from "../models";
require('dotenv').config();

type Request = express$Request;
type Response = express$Response;

const app = require('../app');

app.post('/secure/feedback', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);
    return Feedback.create({
        name: req.body.name,
        content: req.body.content,
        issueId: req.body.issueId,
        userId: req.body.userId
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.get('/issues/:id/feedback/:lim/limit/:off/offset/asc', (req: Request, res: Response) => {
    return Feedback.findAll({
        where: {
            issueId: Number(req.params.id)
        },
        offset: req.params.offs,
        limit: req.params.lim,
        order: [
            ['createdAt']
        ]
        }).then(
        issue => (issue ? res.send(issue) : res.sendStatus(404))
    );
});

app.get('/issues/:id/feedback/:lim/limit/:offs/offset/desc', (req: Request, res: Response) => {
    return Feedback.findAll({
        where: {
                issueId: Number(req.params.id)
        },
        offset: req.params.offs,
        limit: req.params.lim,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(
        issue => (issue ? res.send(issue) : res.sendStatus(404))
    );
});

app.get('/feedback/:id', (req: Request, res: Response) => {
    return Feedback.findOne({
        where: {
            feedbackId: Number(req.params.id)
        }
    }).then(
        feedbak => (feedbak ? res.send(feedbak) : res.sendStatus(404))
    );
});

app.delete('/feedback/:id', (req: Request, res: Response) => {
    return Feedback.destroy({
        where: {
            feedbackId: req.params.id
        }
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
