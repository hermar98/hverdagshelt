//@flow
import {Event} from '../models';

type Request = express$Request;
type Response = express$Response;

const app = require('../app');

//Events
app.get('/municipals/:id/events', (req: Request, res: Response) => {
    return Event.findAll({ where: { munId: Number(req.params.id) } }).then(events =>
        events ? res.send(events) : res.sendStatus(404)
    );
});

//Event
app.get('/secure/events', (req: Request, res: Response) => {
    return Event.findAll().then(events => res.send(events));
});
app.get('/secure/events/:id', (req: Request, res: Response) => {
    return Event.findOne({ where: { eventId: Number(req.params.id) } }).then(event =>
        event ? res.send(event) : res.sendStatus(404)
    );
});
app.put('/secure/events/:id', (req: Request, res: Response) => {
    //Flow type checking mixed src: https://github.com/flow-typed/flow-typed/issues/812
    const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
    const { title, content, image, longitude, latitude, timeStart, timeEnd } = body;

    return Event.update(
        {
            title: title,
            content: content,
            image: image,
            longitude: longitude,
            latitude: latitude,
            timeStart: timeStart,
            timeEnd: timeEnd
        },
        {
            where: {
                eventId: req.params.id
            }
        }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
app.post('/secure/events', (req: Request, res: Response) => {
    // if (!(req.body instanceof Object)) return res.sendStatus(400);
    //Flow type checking mixed src: https://github.com/flow-typed/flow-typed/issues/812
    const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
    const { title, content, image, longitude, latitude, timeStart, timeEnd, categoryId, munId, userId } = body;

    return Event.create({
        title: title,
        content: content,
        image: image,
        longitude: longitude,
        latitude: latitude,
        timeStart: timeStart,
        timeEnd: timeEnd,
        categoryId: categoryId,
        munId: munId,
        userId: userId
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
app.delete('/secure/events/:id', (req: Request, res: Response) => {
    return Event.destroy({
        where: {
            eventId: req.params.id
        }
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
