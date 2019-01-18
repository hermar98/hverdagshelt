//@flow
import {User} from '../models';
import * as passwordHash from '../passwordHash.js';

type Request = express$Request;
type Response = express$Response;

const app = require('../app');


//User
app.get('/secure/users', (req: Request, res: Response) => {
    return User.findAll().then(users => res.send(users));
});

app.get('/secure/users/:id', (req: Request, res: Response) => {
    return User.findOne({ where: { userId: Number(req.params.id) } }).then(user =>
        user ? res.send(user) : res.sendStatus(404)
    );
});

app.post('/secure/users', (req: Request, res: Response) => {
    // if (!(req.body instanceof Object)) return res.sendStatus(400);
    //Flow type checking mixed src: https://github.com/flow-typed/flow-typed/issues/812
    const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
    const { firstName, lastName, email, rank, salt, hashStr } = body;

    return User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        rank: rank,
        salt: salt,
        hashStr: hashStr
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.put('/secure/users/:id', (req: Request, res: Response) => {
    //Flow type checking mixed src: https://github.com/flow-typed/flow-typed/issues/812
    const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
    const { firstName, lastName, email, rank, munId, password, salt, hashStr } = body;

    // if (!req.body || !(typeof req.body.email === 'string')) return res.sendStatus(400);

    if (password) {
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
        ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
    }

    return User.update(
        {
            firstName: firstName,
            lastName: lastName,
            email: email,
            rank: rank,
            munId: munId,
            salt: salt,
            hashStr: hashStr
        },
        { where: { userId: req.params.id } }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.delete('/secure/users/:id', (req: Request, res: Response) => {
    return User.destroy({
        where: { userId: req.params.id }
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});