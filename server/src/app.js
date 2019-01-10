import {
    Event,
    User,
    User_case,
    County,
    Municipal,
    Status,
    Issue_category,
    Issue,
    Feedback,
    Event_category
} from './models.js';

import * as passwordHash from './passwordHash.js';
import express from "express";
import path from "path";
import fs from 'fs';
import jwt from 'jsonwebtoken';
type Request = express$Request;
type Response = express$Response;

const public_path = path.join(__dirname, '/../../client/public');

let app = express();
app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json

let privateKey = fs.readFileSync('./private.key', 'utf8');
let publicKey = fs.readFileSync('./public.key', 'utf8');

app.post('/login', (req: Request, res: Response) => {
    User.findOne({where: {email: req.body.email}}).then(user => {
        let passwordData = passwordHash.sha512(req.body.password, user.salt);
        if (passwordData.passwordHash === user.hash_str) {
            let token = jwt.sign({ email: req.body.email }, privateKey, {
                expiresIn: 60
            });
            res.json({ jwt: token });
        } else {
            res.status(401);
            res.json({ error: "Not authorized" });
        }
    })
});

//User
app.get('/users', (req: Request, res: response) => {
    return User.findAll().then(users => res.send(users));
});

app.get('/users/:id', (req: Request, res: Response) => {
    return User.findOne({ where: { user_id: Number(req.params.id) } }).then(user =>
        user ? res.send(user) : res.sendStatus(404)
    );
});

app.post('/users', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);

    var passwordSalt = passwordHash.genRandomString(16);
    var passwordData = passwordHash.sha512(req.body.password, passwordSalt);

    return User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        rank: req.body.rank,
        salt: passwordData.salt,
        hash_str: passwordData.passwordHash
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.put('/users/:id', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);

    return User.update({
            email: req.body.email,
            password: req.body.password,
            salt: req.body.salt,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            rank: req.body.rank},
        {where: { id: req.params.id }}
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.delete('/users/:id', (req: Request, res: Response) => {
    return User.destroy({
        where: {id: req.params.id}
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)))
});

//Issue
app.get('/users/:id/issue', (req: Request, res: Response) => {
    return Issue.findAll({ where: { user_id: Number(req.params.id) } }).then(issue =>
        issue ? res.send(issue) : res.sendStatus(404)
    );
});

//Event
app.get('/events', (req: Request, res: Response) => {
    return Event.findAll().then(events => res.send(events));
});
app.get('/events/:id', (req:Request,res:Response) => {
    return Event.findOne({where:{event_id: Number(req.params.id)}}).then(event =>
        event ? res.send(event) : res.sendStatus(404)
    );
});
app.put('/events/:id', (req: Request, res: Response) => {
    if(!(req.body instanceof Object)) return res.sendStatus(400);
    return Event.update(
        {
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            time_start: req.body.time_start,
            time_end: req.body.time_end
        }, {
            where: {
                event_id: req.params.id
            }
        }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)))
});
app.post('/events', (req:Request, res: Response) => {
    if(!(req.body instanceof Object)) return res.sendStatus(400);
    return Event.create(
        {
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            time_start: req.body.time_start,
            time_end: req.body.time_end
        }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)))
});
app.delete('/events/:id', function (req, res) {
    return Event.destroy(
        {
            where: {
                event_id: req.params.id
            }
        }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

//Event_category
app.get('/eventCat', (req: Request, res: Response) => {
    return Event_category.findAll().then(eventCategories => res.send(eventCategories));
});
app.get('/eventCat/:id', (req:Request,res:Response) => {
    return Event_category.findOne({where:{category_id: Number(req.params.id)}}).then(eventCategory =>
        eventCategory ? res.send(eventCategory) : res.sendStatus(404)
    );
});
app.put('/eventCat/:id', (req: Request, res: Response) => {
    if(!(req.body instanceof Object)) return res.sendStatus(400);
    return Event_category.update(
        {
            name: req.body.name,
        }, {
            where: {
                category_id: req.params.id
            }
        }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)))
});
app.post('/eventCat', (req:Request, res: Response) => {
    if(!(req.body instanceof Object)) return res.sendStatus(400);
    return Event_category.create(
        {
            name: req.body.name
        }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)))
});
app.delete('/eventCat/:id', function (req, res) {
    return Event_category.destroy(
        {
            where: {
                category_id: req.params.id
            }
        }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});


//Issue_category
app.get('/issueCat', (req: Request, res: Response) => {
    return Issue_category.findAll().then(issueCategories => res.send(issueCategories));
});
app.get('/issueCat/:id', (req:Request,res:Response) => {
    return Issue_category.findOne({where:{category_id: Number(req.params.id)}}).then(issueCategory =>
        issueCategory ? res.send(issueCategory) : res.sendStatus(404)
    );
});
app.put('/issueCat/:id', (req: Request, res: Response) => {
    if(!(req.body instanceof Object)) return res.sendStatus(400);
    return Issue_category.update(
        {
            name: req.body.name,
        }, {
            where: {
                category_id: req.params.id
            }
        }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)))
});
app.post('/issueCat', (req:Request, res: Response) => {
    if(!(req.body instanceof Object)) return res.sendStatus(400);
    return Issue_category.create(
        {
            name: req.body.name
        }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)))
});
app.delete('/issueCat/:id', function (req, res) {
    return Issue_category.destroy(
        {
            where: {
                category_id: req.params.id
            }
        }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

module.exports = app;