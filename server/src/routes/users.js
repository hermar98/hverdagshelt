//@flow
import {sequelize, User} from '../models';
import * as passwordHash from '../passwordHash.js';
import {tokenManager} from '../tokenManager.js';

type Request = express$Request;
type Response = express$Response;

const app = require('../app');


//User
app.get('/users', (req: Request, res: Response) => {
    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        if (tokenData.rank === 4) {
            return User.findAll({ where: {rank: {[sequelize.Op.ne]: 0} }})
                .then(users => res.send(users));
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

app.get('/users/:id', (req: Request, res: Response) => {
    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        if (tokenData.rank === 4 || tokenData.userId === Number(req.params.id)) {
            return User.findOne({where: {userId: Number(req.params.id)}}).then(user =>
                user ? res.send(user) : res.sendStatus(404)
            );
        }
    }
    return User.findOne({where: {userId: Number(req.params.id)}}).then(user => user ?
        res.send({userId: user.userId, firstName: user.firstName, lastName: user.lastName, rank: user.rank}) :
        res.sendStatus(404)
    );
});

app.get('/token/user', (req: Request, res: Response) => {
    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        return User.findOne({where: {userId: Number(tokenData.userId)}}).then(user =>
            user ? res.send(user) : res.sendStatus(404)
        );
    }
    res.sendStatus(401);
});

app.post('/users', (req: Request, res: Response) => {
    // if (!(req.body instanceof Object)) return res.sendStatus(400);
    //Flow type checking mixed src: https://github.com/flow-typed/flow-typed/issues/812
    const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
    const { firstName, lastName, email, rank, password } = body;

    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        if (tokenData.rank === 4) {
            let passwordSalt = passwordHash.genRandomString(16);
            let passwordData = passwordHash.sha512(password, passwordSalt);

            return User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                rank: rank,
                salt: passwordSalt,
                hashStr: passwordData.passwordHash
            }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)))
                .catch(err => {
                    console.log(err);
                    res.sendStatus(409);
                });
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

app.put('/users/:id', (req: Request, res: Response) => {
    //Flow type checking mixed src: https://github.com/flow-typed/flow-typed/issues/812
    const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
    const { firstName, lastName, email, rank, munId, password } = body;

    // if (!req.body || !(typeof req.body.email === 'string')) return res.sendStatus(400);

    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        if (tokenData.rank === 4 || tokenData.userId === Number(req.params.id)) {
            if(password) {
                let passwordSalt = passwordHash.genRandomString(16);
                let passwordData = passwordHash.sha512(password, passwordSalt);

                return User.update(
                    {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        rank: rank,
                        munId: munId,
                        salt: passwordSalt,
                        hashStr: passwordData.passwordHash
                    },
                    { where: { userId: req.params.id } }
                ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)))
                    .catch(err => {
                        console.log(err);
                        res.sendStatus(409);
                    });
            }

            return User.update(
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    rank: rank,
                    munId: munId,
                },
                { where: { userId: req.params.id } }
            ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)))
                .catch(err => {
                    console.log(err);
                    res.sendStatus(409);
                });

        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

app.delete('/users/:id', (req: Request, res: Response) => {
    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        if (tokenData.rank === 4) {
            return User.destroy({
                where: { userId: req.params.id }
            }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});