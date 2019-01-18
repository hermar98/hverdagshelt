//@flow
import {County} from '../models';

type Request = express$Request;
type Response = express$Response;

const app = require('../app');

//County
app.get('/county', (req: Request, res: Response) => {
    return County.findAll().then(users => res.send(users));
});

app.get('/county/:id', (req: Request, res: Response) => {
    return County.findOne({ where: { countyId: Number(req.params.id) } }).then(user =>
        user ? res.send(user) : res.sendStatus(404)
    );
});
