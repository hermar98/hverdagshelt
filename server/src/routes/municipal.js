//@flow
import {Municipal} from '../models';

type Request = express$Request;
type Response = express$Response;

const app = require('../app');

//Municipal
app.get('/municipals', (req: Request, res: Response) => {
    return Municipal.findAll().then(muns => res.send(muns));
});

app.get('/municipals/:id', (req: Request, res: Response) => {
    return Municipal.findOne({ where: { munId: Number(req.params.id) } }).then(mun =>
        mun ? res.send(mun) : res.sendStatus(404)
    );
});
