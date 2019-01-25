//@flow
import {Municipal, User, UserIssue, UserMunicipal} from '../models';
import {tokenManager} from "../tokenManager";

type Request = express$Request;
type Response = express$Response;

const app = require('../app');


app.get('/users/:id/mun', (req: Request, res: Response) => { //userMun
    return Municipal.findAll({
        include: [
            {
                model: User,
                as: 'Users',
                attributes: [],
                where: { userId: Number(req.params.id) }
            }
        ]
    }).then(user => (user ? res.send(user) : res.sendStatus(404)));
});

app.post('/users/:userId/mun/:munId', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);

    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        return UserMunicipal.create({
            userId: req.params.userId,
            munId: req.params.munId
        }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
    } else {
        res.sendStatus(401);
    }
});

app.delete('/users/:userId/mun/:munId', (req: Request, res: Response) => {
    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        return UserMunicipal.destroy({ where: { userId: req.params.userId, munId: req.params.munId } }).then(count =>
            count ? res.sendStatus(200) : res.sendStatus(404)
        );
    } else {
        res.sendStatus(401);
    }
});
