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

let secretKey = fs.readFileSync('./secret.key', 'utf8');

app.use('/secure', (req, res, next) => {
    let token = req.headers['x-access-token'];
    jwt.verify(token, secretKey, err => {
        if (err) {
            res.sendStatus(401);
        } else {
            next();
        }
    });
});

app.post('/login', (req: Request, res: Response) => {
    User.findOne({where: {email: req.body.email}}).then(user => {
        if (user) {
            let passwordData = passwordHash.sha512(req.body.password, user.salt);
            if (passwordData.passwordHash === user.hash_str) {
                let token = jwt.sign({ email: req.body.email }, secretKey, {
                    expiresIn: 600
                });
                res.json({ jwt: token });
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        }
    })
});

app.get("/token", (req, res) => {
    let token = req.headers["x-access-token"];
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.sendStatus(401);
        } else {
            token = jwt.sign({ email: decoded.email }, secretKey, {
                expiresIn: 600
            });
            res.json({ jwt: token });
        }
    })
});

app.post('/register', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);

    let passwordSalt = passwordHash.genRandomString(16);
    let passwordData = passwordHash.sha512(req.body.password, passwordSalt);

    return User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        rank: req.body.rank,
        salt: passwordSalt,
        hash_str: passwordData.passwordHash
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

//User
app.get('/secure/users', (req: Request, res: response) => {
    return User.findAll().then(users => res.send(users));
});

app.get('/secure/users/:id', (req: Request, res: Response) => {
    return User.findOne({ where: { user_id: Number(req.params.id) } }).then(user =>
        user ? res.send(user) : res.sendStatus(404)
    );
});

app.post('/secure/users', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);

    return User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        rank: req.body.rank,
        salt: req.body.salt,
        hash_str: req.body.hash_str
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.put('/secure/users/:id', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);

    if (req.body.password) {
        let passwordSalt = passwordHash.genRandomString(16);
        let passwordData = passwordHash.sha512(req.body.password, passwordSalt);

        return User.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                rank: req.body.rank,
                salt: passwordSalt,
                hash_str: passwordData.passwordHash},
            {where: { user_id: req.params.id }}
        ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
    }

    return User.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            rank: req.body.rank,
            salt: req.body.salt,
            hash_str: req.body.hash_str},
        {where: { user_id: req.params.id }}
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.delete('/secure/users/:id', (req: Request, res: Response) => {
    return User.destroy({
        where: {user_id: req.params.id}
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)))
});

//Issue
app.get('/secure/users/:id/issue', (req: Request, res: Response) => {
    return Issue.findAll({ where: { user_id: Number(req.params.id) } }).then(issue =>
        issue ? res.send(issue) : res.sendStatus(404)
    );
});

//Event
app.get('/secure/events', (req: Request, res: Response) => {
    return Event.findAll().then(events => res.send(events));
});
app.get('/secure/events/:id', (req:Request,res:Response) => {
    return Event.findOne({where:{event_id: Number(req.params.id)}}).then(event =>
        event ? res.send(event) : res.sendStatus(404)
    );
});
app.put('/secure/events/:id', (req: Request, res: Response) => {
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
app.post('/secure/events', (req:Request, res: Response) => {
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
app.delete('/secure/events/:id', function (req, res) {
    return Event.destroy(
        {
            where: {
                event_id: req.params.id
            }
        }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

//Event_category
app.get('/secure/eventCat', (req: Request, res: Response) => {
    return Event_category.findAll().then(eventCategories => res.send(eventCategories));
});
app.get('/secure/eventCat/:id', (req:Request,res:Response) => {
    return Event_category.findOne({where:{category_id: Number(req.params.id)}}).then(eventCategory =>
        eventCategory ? res.send(eventCategory) : res.sendStatus(404)
    );
});
app.put('/secure/eventCat/:id', (req: Request, res: Response) => {
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
app.post('/secure/eventCat', (req:Request, res: Response) => {
    if(!(req.body instanceof Object)) return res.sendStatus(400);
    return Event_category.create(
        {
            name: req.body.name
        }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)))
});
app.delete('/secure/eventCat/:id', function (req, res) {
    return Event_category.destroy(
        {
            where: {
                category_id: req.params.id
            }
        }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});


//Issue_category
app.get('/secure/issueCat', (req: Request, res: Response) => {
    return Issue_category.findAll().then(issueCategories => res.send(issueCategories));
});
app.get('/secure/issueCat/:id', (req:Request,res:Response) => {
    return Issue_category.findOne({where:{category_id: Number(req.params.id)}}).then(issueCategory =>
        issueCategory ? res.send(issueCategory) : res.sendStatus(404)
    );
});
app.put('/secure/issueCat/:id', (req: Request, res: Response) => {
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
app.post('/secure/issueCat', (req:Request, res: Response) => {
    if(!(req.body instanceof Object)) return res.sendStatus(400);
    return Issue_category.create(
        {
            name: req.body.name
        }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)))
});
app.delete('/secure/issueCat/:id', function (req, res) {
    return Issue_category.destroy(
        {
            where: {
                category_id: req.params.id
            }
        }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

module.exports = app;