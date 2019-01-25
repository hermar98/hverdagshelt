import {Feedback, Issue, User} from "../models";
import {tokenManager} from "../tokenManager";
import * as passwordHash from "../passwordHash";
require('dotenv').config();

type Request = express$Request;
type Response = express$Response;

const app = require('../app');
//POST one feedback
app.post('/feedback', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);

    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        return Feedback.create({
            name: req.body.name,
            content: req.body.content,
            issueId: req.body.issueId,
            userId: req.body.userId
        }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
    } else {
        res.sendStatus(401);
    }
});

//GET all feedback for one issue, ordered ascending
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
//GET all feedback for one issue, ordered descending
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
//GET one feedback with id
app.get('/feedback/:id', (req: Request, res: Response) => {
    return Feedback.findOne({
        where: {
            feedbackId: Number(req.params.id)
        }
    }).then(
        feedbak => (feedbak ? res.send(feedbak) : res.sendStatus(404))
    );
});

//UPDATE one feedback with id
app.put('/feedback/:id', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);

    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        return Feedback.update(
            {
                content: req.body.content
            },
            {
                where: {
                    feedbackId: req.params.id
                }
            }
        ).then(feedback => (feedback ? res.sendStatus(200) : res.sendStatus(404)));
    } else {
        res.sendStatus(401);
    }
});

//DELETE one feedback with id
app.delete('/feedback/:id', (req: Request, res: Response) => {
    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        return Feedback.destroy({
            where: {
                feedbackId: req.params.id
            }
        }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
    } else {
        res.sendStatus(401);
    }
});
