//@flow
import {EventCategory, User} from '../models';
import {tokenManager} from "../tokenManager";
import * as passwordHash from "../passwordHash";

type Request = express$Request;
type Response = express$Response;

const app = require('../app');

//EventCategory
app.get('/eventCat', (req: Request, res: Response) => {
    return EventCategory.findAll().then(eventCategories => res.send(eventCategories));
});

app.get('/eventCat/:id', (req: Request, res: Response) => {
    return EventCategory.findOne({ where: { categoryId: Number(req.params.id) } }).then(eventCategory =>
        eventCategory ? res.send(eventCategory) : res.sendStatus(404)
    );
});

app.put('/eventCat/:id', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);

    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        if (tokenData.rank === 4 || tokenData.rank === 3) {
            return EventCategory.update(
                {
                    name: req.body.name
                },
                {
                    where: {
                        categoryId: req.params.id
                    }
                }
            ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

app.post('/eventCat', (req: Request, res: Response) => {
    // if (!(req.body instanceof Object)) return res.sendStatus(400);
    //Flow type checking mixed src: https://github.com/flow-typed/flow-typed/issues/812
    const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
    const { name } = body;

    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        if (tokenData.rank === 4 || tokenData.rank === 3) {
            return EventCategory.create({
                name: name
            }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

app.delete('/eventCat/:id', (req: Request, res: Response) => {
    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        if (tokenData.rank === 4 || tokenData.rank === 3) {
            return EventCategory.destroy({
                where: {
                    categoryId: req.params.id
                }
            }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});