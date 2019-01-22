import {Issue, Feedback, User} from "../models";
import Sequelize from "../../flow-typed/npm/sequelize_v4.x.x";
import {mailSender} from '../MailSender';

type Request = express$Request;
type Response = express$Response;

const app = require('../app');

app.get('/issues/:lim/limit/:offset/offset/:catId/category/:order/ordering/:statusId/status/:munId/municipal', (req: Request, res: Response) => {
    let where = {offset: parseInt(req.params.offset)};
    where.where  = {
        categoryId: 0,
    };

    where.where +={
        statusId: 0
    };

    console.log(where);
    console.log(where.where);

    let order;
    if(req.params.order = 0){
        order = 'DESC'
    } else{
        order = 'ASC'
    }

    let catId;
    if(req.params.catId != 0){
        catId = req.params.catId;;
    } else {
        catId = {$ne: null};
    }

    let statusId;
    if(req.params.statusId != 0) {
        statusId = req.params.statusId;
    } else {
        statusId = {$ne: null};
    }

    let munId;
    if(req.params.munId != 0) {
        munId = req.params.munId;
    } else {
        munId = {$ne: null};
    }

    return Issue.findAll({
        where: {
            categoryId: catId,
            statusId: statusId,
            munId: munId
        },
        order: [
            ['createdAt', order]
        ],
        offset: parseInt(req.params.offset),
        limit: parseInt(req.params.lim),
    }).then( issue => (issue ? res.send(issue) : res.sendStatus(404))
    );
});

app.get('/issues/:lim/limit/:offset/offset/desc', (req: Request, res: Response) => {
    return Issue.findAll({
            offset: req.params.offset,
            limit: req.params.lim,
            order: [
                ['createdAt', 'DESC']
            ]
        }).then( issue => (issue ? res.send(issue) : res.sendStatus(404))
    );
});

app.get('/issues/:lim/limit/:offset/offset/asc', (req: Request, res: Response) => {
    return Issue.findAll({
        offset: req.params.offset,
        limit: req.params.lim,
        order: [
            ['createdAt']
        ]
    }).then( issue => (issue ? res.send(issue) : res.sendStatus(404))
    );
});

app.get('/issues/:lim/limit/:offset/offset/cat/asc', (req: Request, res: Response) => {
    return Issue.findAll({
        where: {categoryId: req.params.categoryId},
        offset: req.params.offset,
        limit: req.params.lim,
        order: [
            ['createdAt']
        ]
    }).then( issue => (issue ? res.send(issue) : res.sendStatus(404))
    );
});

app.get('/issues/:lim/limit/:offset/offset/cat/desc', (req: Request, res: Response) => {
    return Issue.findAll({
        where: {categoryId: req.params.categoryId},
        offset: req.params.offset,
        limit: req.params.lim,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then( issue => (issue ? res.send(issue) : res.sendStatus(404))
    );
});

app.get('/municipals/:id/issues', (req: Request, res: Response) => {
    return Issue.findAll({ where: { munId: Number(req.params.id) } }).then(issues =>
        issues ? res.send(issues) : res.sendStatus(404)
    );
});

app.get('/secure/users/:id/issues', (req: Request, res: Response) => {
    return Issue.findAll({ where: { userId: Number(req.params.id) } }).then(issue =>
        issue ? res.send(issue) : res.sendStatus(404)
    );
});


//Issue

app.get('/secure/issues', (req: Request, res: Response) => {
    return Issue.findAll().then(issues => res.send(issues));
});
app.get('/secure/issues/:id', (req: Request, res: Response) => {
    return Issue.findOne({ where: { issueId: Number(req.params.id) } }).then(issue =>
        issue ? res.send(issue) : res.sendStatus(404)
    );
});
app.get('/secure/issues/:id/feedback', (req: Request, res: Response) => {
    return Feedback.findAll({ where: { issueId: Number(req.params.id) } }).then(issue =>
        issue ? res.send(issue) : res.sendStatus(404)
    );
});


app.put('/secure/issues/:id', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);
    return Issue.update(
        {
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            statusId: req.body.statusId,
            date: req.body.date,
            munId: req.body.munId
        },
        {
            where: {
                issueId: req.params.id
            }
        }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
app.post('/secure/issues', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);
    return Issue.create({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        status: req.body.status,
        statusId: req.body.statusId,
        categoryId: req.body.categoryId,
        munId: req.body.munId,
        userId: req.body.userId
    }).then(count => {
        if(!count){
          console.log("Something went wrong")

          res.sendStatus(404);
        }else{
          console.log("Nothing wrong here, please continue");

          res.sendStatus(200);
              User.findOne({
                where: {
                  userId: req.body.userId
                }
              }).then(user => mailSender.sendEmail(user.email, "Din sak har blitt registrert!", "Hei " + user.firstName + " " +
              user.lastName + "!\n\nDin sak '" + req.body.title + "' har nå blitt registrert i systemet, og en av våre fremste ansatte vil så fort" +
                " som mulig påbegynne saksbehandlingen. Tusen takk for at du melder inn feil, og bidrar til å gjøre Norge et bedre sted!\n\nMed vennlig hilsen\n" +
                "Ya boi mr Gayman, Aka young fleinar kokt i fleinsuppe (Dank Kushman aka young dagger dick)\nShoutout til min boi lil thuggers, som er fast as fucc boi"));
        }
    });
});

app.delete('/secure/issues/:id', (req: Request, res: Response) => {
    return Issue.destroy({
        where: {
            issueId: req.params.id
        }
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
