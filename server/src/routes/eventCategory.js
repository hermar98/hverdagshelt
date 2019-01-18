//@flow
import {EventCategory} from '../models';

type Request = express$Request;
type Response = express$Response;

const app = require('../app');

//EventCategory
app.get('/secure/eventCat', (req: Request, res: Response) => {
    return EventCategory.findAll().then(eventCategories => res.send(eventCategories));
});

app.get('/secure/eventCat/:id', (req: Request, res: Response) => {
    return EventCategory.findOne({ where: { categoryId: Number(req.params.id) } }).then(eventCategory =>
        eventCategory ? res.send(eventCategory) : res.sendStatus(404)
    );
});

app.put('/secure/eventCat/:id', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);
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
});
app.post('/secure/eventCat', (req: Request, res: Response) => {
    // if (!(req.body instanceof Object)) return res.sendStatus(400);
    //Flow type checking mixed src: https://github.com/flow-typed/flow-typed/issues/812
    const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
    const { name } = body;

    return EventCategory.create({
        name: name
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
app.delete('/secure/eventCat/:id', (req: Request, res: Response) => {
    return EventCategory.destroy({
        where: {
            categoryId: req.params.id
        }
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});