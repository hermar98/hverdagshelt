//@flow
import {Municipal, User, UserMunicipal} from '../models';

type Request = express$Request;
type Response = express$Response;

const app = require('../app');


app.get('/secure/users/:id/mun', (req: Request, res: Response) => {
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

app.post('/secure/users/:userId/mun/:munId', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);
    return UserMunicipal.create({
        userId: req.params.userId,
        munId: req.params.munId
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.delete('/secure/users/:userId/mun/:munId', (req: Request, res: Response) => {
    return UserMunicipal.destroy({ where: { userId: req.params.userId, munId: req.params.munId } }).then(count =>
        count ? res.sendStatus(200) : res.sendStatus(404)
    );
});
